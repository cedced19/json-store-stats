var fs = require('fs');

function Store(path) {
    this.path = path;
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
    this.Store = JSON.parse(fs.readFileSync(path));
}

Store.prototype.getAll = function () {
    return this.Store;
}

Store.prototype.get = function (id) {
    if (this.exists(id)) {
        return this.Store[id];
    } else {
        return 0;
    }
}

Store.prototype.add = function (id, cb) {
    if (this.exists(id)) {
        this.Store[id]++;
    } else {
        this.Store[id] = 1;
    }
    this.save(cb);
}

Store.prototype.purge = function (cb) {
    this.Store = {};
    this.save(cb);
}

Store.prototype.save = function (cb) {
    fs.writeFile(this.path, JSON.stringify(this.Store), cb);
}

Store.prototype.exists = function (id) {
    var exists = false;
    for (var i in this.Store) {
        if (i == id) {
            exists = true;
        }
    }
    return exists;
}

module.exports = function (path) {
    return new Store(path);
}