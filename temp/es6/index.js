const Creator = require('../create');

class Es6Creator extends Creator {
  constructor() {
    super(__dirname);
  }
}

module.exports = Es6Creator;
