const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./web');
const RPC = require('../../lib/localrpc');

if (cluster.isMaster) {
  console.log('宿主启动...');
  for (let i = 0; i < numCPUs; i++) {
    var worker = cluster.fork({ pname: 'web service' });
  }
  setTimeout(() => {
    for (let key in cluster.workers){
      cluster.workers[key].process.send('test');
    }
  }, 1000)
  cluster.on('listening', (worker, address) => {
    console.log(`pid:${worker.process.pid} 启动`);
  });
  cluster.on('exit', (worker, code, signal) =>{
    console.log(`pid: ${worker.process.pid} 重启`);
    cluster.fork();
  });
  const rpc = new RPC(cluster);
  rpc.init();
} else {
  app();
}
