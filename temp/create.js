const fs = require('fs');

const ignore = ['node_modules'];
function _copy(path, target) {
  const names = fs.readdirSync(path);
  names.forEach(name => {
    const source = `${path}/${name}`,
      dist = `${target}/${name}`;
    fs.stat(source, (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile()) {
        const readable = fs.createReadStream(source);
        const writable = fs.createWriteStream(dist);
        readable.pipe(writable);
      } else if (stats.isDirectory() && ignore.indexOf(name) === -1) {
        fs.mkdirSync(dist);
        _copy(source, dist);
      }
    }) 
  });
}

class Creator {
  constructor(path) {
    this.root = path;
  }
  create(projectPath) {
    console.log(this.root);
    this.copy(projectPath);
  }

  copy(projectPath, tempPath = `${this.root}/temp`) {
    _copy(tempPath, projectPath);
  }
}

module.exports = Creator;
