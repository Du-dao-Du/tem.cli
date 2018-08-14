
class DB {
  constructor(){

  }
  run(data) {
    console.log(data.type);
  }
}

class DataPackage {
  type;
  sql
}

module.exports = {
  DB,
  DataPackage
};
