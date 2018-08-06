#!/usr/bin/env node
require('./colors');
let fs = require('fs');
let path = require('path');
let inquirer = require('inquirer');
const  childProcess = require('child_process');
const { consoleInput } = require ('./util');
const { ROOT: rootpath } = require('./config');

const temp_path = `${rootpath}/temp`;
var temps = fs.readdirSync(temp_path).filter(path => fs.statSync(`${rootpath}/temp/${path}`).isDirectory());
console.log('select you want create template, please!'.info);
(async function () {
  const result = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'which version do you want to install?',
      choices: temps
    }
  ]);
  console.log(`${temp_path}/${result.version}`);
  const p_name = await consoleInput('请输入项目名');
  const pwd = process.cwd(); // process.execSync('pwd').toString();
  const projectPath = `${pwd}/${p_name}`;
  if (fs.existsSync(projectPath)) {
    if(fs.readdirSync(projectPath).length) {
      console.log(`项目路径[${projectPath}]已存在且不是空目录`.error);
      process.exit(0);
    }
  } else {
    fs.mkdirSync(projectPath);
  }
  console.log(projectPath);
  const factory = require(`${temp_path}/${result.version}/index`);
  new factory().create(projectPath);
  // console.log(process.execSync('pwd').toString());
})();
