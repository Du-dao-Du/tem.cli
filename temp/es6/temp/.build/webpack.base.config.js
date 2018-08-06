const path = require('path');
const fs = require('fs');


const cssLoader = ['style-loader', 'css-loader'];
const lessloader = cssLoader.concat(['less-loader']);
const rootPath = path.resolve(__dirname, '../');
const getEntry = function(entrypath, entry) {
  return fs.readdirSync(entrypath).forEach(path => {
    const filepath = `${entrypath}/${path}`;
    const stat = fs.statSync(filepath);
    if (!stat.isFile()) {
      getEntry(filepath, entry);
    } else {
      if (/\.js$/.test(filepath)) {
        entry[filepath.replace(`${rootPath}/entry/`, '').replace(/\//g, '.').replace(/\.js$/, '')] = filepath;
      }
    }
  });
};

const entry = {};
getEntry(path.resolve(rootPath, './entry/'), entry);

const config = {
  mode: 'development',
  entry,
  output: {
    path: `${rootPath}/dist`,
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader
      },
      {
        test: /\.less$/,
        use: lessloader
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: ['src', 'entry'].map(name => `${rootPath}/${name}`), // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          // formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: `${rootPath}/node_modules` //编译时，不需要编译哪些文件
        /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
        // query: {
        //   presets: ['latest'] //按照最新的ES6语法规则去转换
        // }

      }
    ]
  },
};
module.exports = config;
