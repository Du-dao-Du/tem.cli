const db = require('./db.json');
const path = require('path');

const rootPath = path.resolve(__dirname, '..');
module.exports = {
  db,
  rootPath,
  actionRoot: `${rootPath}/src/action`
}
