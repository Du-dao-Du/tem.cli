const mysql = require('mysql');

class Connect {
  constructor(db) {
    this.pool = mysql.createPool(Object.assign({
      acquireTimeout: 10000,
      connectionLimit: 5
    }, db));
  }

  getConnect() {
    return this.pool.getConnect();
  }
}

module.exports = Connect;
