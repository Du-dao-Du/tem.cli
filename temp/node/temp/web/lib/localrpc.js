class LocalRPC {
  constructor(pro = process) {
    this.process = pro;
  }
  init() {
    this.process.on('message', (worker, message, handle) => {
      const param = {}
      if (!this.process.isMaster) {
        param.message = worker;
        param.handle = message;
      } else {
        param.worker = worker;
        param.message = message;
        param.handle = handle;
      }
      this.onmessage(param);
    })
  }
  onmessage(data) {
    console.log(`${this.process.pid} receive data : ${JSON.stringify(data.message)}`);
  }
}

module.exports = LocalRPC;
