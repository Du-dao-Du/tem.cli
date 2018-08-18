const Creator = require('../create');
const inquirer = require('inquirer');

const projectType = {
  '默认': 'local',
  'web项目': 'web'
}
class NodeCreator extends Creator {
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

module.exports = NodeCreator;

