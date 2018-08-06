const base = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const key = 'preview.index';
base.entry[key] = `${rootPath}/preview/index.js`;

const config = {
  ...base,
  plugins: [
    new HtmlWebpackPlugin({filename:'index.html', template: `${rootPath}/preview/index.html`, chunks:[key]})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    host: '0.0.0.0',
    compress: true, // 开启服务端压缩，即response 压缩传输
    // port: 8080
  }
}

console.log(config);
module.exports = config;
