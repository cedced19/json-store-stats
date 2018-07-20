const assert = require('assert');
const path = require('path');
const fs = require('fs');
const examplePath = path.join(process.cwd(),'/example.json');
const exampleContent = JSON.parse(fs.readFileSync(examplePath));
const randomstring = require('randomstring');

function size(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

describe('JSON Storage Stats', function () {

    it('the module can be required without throwing', function () {
        var JSONStorage = require('../');
    });

    describe('run test', function () {

        beforeEach(function () {
            fs.writeFileSync(examplePath, JSON.stringify(exampleContent));
        });

        after(function () {
            fs.writeFileSync(examplePath, JSON.stringify(exampleContent));
        });

        it('should give the content of example.json', function () {
            var content = require('../')(examplePath).getAll();
            assert.equal(content['49CzH'], 0);
            assert.equal(content['ND9gB'], 3);
        });

        it('should give the value for the id "ND9gB"', function () {
            var val = require('../')(examplePath).get('ND9gB');
            assert.equal(val, 3);
        });

        it('should give the value for the id "49CzH"', function () {
            var val = require('../')(examplePath).get('49CzH');
            assert.equal(val, 0);
        });

        it('should give the value for a random id', function () {
            var val = require('../')(examplePath).get(randomstring.generate(5));
            assert.equal(val, 0);
        });

        it('should purge the file', function (done) {
            var store = require('../')(examplePath);
            store.purge(function (err) {
                assert.equal(size(store.getAll()), 0);
                done();
            });
        });

        it('should increment the value for the id "ND9gB"', function (done) {
            var store = require('../')(examplePath);
            store.add('ND9gB', function (err) {
                assert.equal(store.get('ND9gB'), 4);
                done();
            });
        });

        it('should increment the value for a random id', function (done) {
            var id = randomstring.generate(5);
            var store = require('../')(examplePath);
            store.add(id, function (err) {
                assert.equal(store.get(id), 1);
                done();
            });
        });


        it('should create new file if it does not exist', function () {
            var example2Path = path.join(process.cwd(),'/example2.json');
            assert.equal(fs.existsSync(example2Path), false);
            var store = require('../')(example2Path);
            assert.equal(fs.existsSync(example2Path), true);
            fs.unlinkSync(example2Path);
        });

    });
});