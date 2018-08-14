const express = require('express');
const RPC = require('../../lib/localrpc.js');
const Route = require('../../lib/route/route.js');
const conf = require('../../config/config.js');

module.exports = () => {
  const app = express();
  const route = new Route(conf.actionRoot);
  app.get('/*', (req, res) => {
    route.handleRequest(req, res);
  });
  app.post('/*', (req, res) => {
    route.handleRequest(req, res);
  });
  app.put('/*', (req, res) => {
    route.handleRequest(req, res);
  })
  app.listen(3000);
  new RPC().init();
  // process.send({
  //   type:'aa',
  //   data: {
  //     type: 'select',
  //     sql: 'select * from aa'
  //   }
  // });
}



