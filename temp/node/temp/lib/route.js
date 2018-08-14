class Route{
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.routeSheet = {};
    this.clazzSheet = {};
  }

  handleRequest(req, res) {
    if (!this.routeSheet[req.path]) {
      const paths = req.path.split('/').filter(str => str);
      const clazzPath = `${this.rootPath}/${paths.slice(0, paths.length - 1).join('/')}`;
      try {
        if (!this.clazzSheet[clazzPath]) {
          console.log(clazzPath);
          const clazz = require(clazzPath);
          this.clazzSheet[clazzPath] = new clazz();
        }
        const obj = this.clazzSheet[clazzPath];
        const methodName = paths[paths.length - 1];
        if (typeof obj[methodName] === 'function') {
          this.routeSheet[req.path] = {
            methodName,
            obj,
            run: function(request, actionData) {
              return actionData.obj[methodName](request);
            }
          };
        } else {
          throw new Error('404');
        }
      } catch(e) {
        console.error(e);
        res.status(404).send(`cannot find [${req.path}]!`);
        return;
      }
    }
    const action = this.routeSheet[req.path];
    const results = action.run(req, action);
    if (results) {
      res.status(200).send(results);
    }
    res.status(200).end();
  }
}

module.exports = Route;
