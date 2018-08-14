const Creator = require('../create');

class NodeCreator extends Creator {
  constructor() {
    super(__dirname);
  }
}

module.exports = NodeCreator;
