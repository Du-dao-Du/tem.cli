const Creator = require('../create');
const inquirer = require('inquirer');

const projectType = {
  '多页面项目': 'default.temp',
  '单页面项目': 'router'
}
class VueCreator extends Creator {
  constructor() {
    super(__dirname);
  }
  async create(projectPath) {
    const result = await inquirer.prompt({
      type: 'list',
      name: 'answer',
      message: '请选择要创建的项目类型:',
      choices: Object.keys(projectType)
    });
    // console.log(projectType[result.answer]);
    this.copy(projectPath, `${this.root}/temp/${projectType[result.answer]}`);
  }
}

module.exports = VueCreator;
