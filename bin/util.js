const readline = require('readline');


const consoleInput = (tips = '请输入') => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(tips, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
module.exports = {
  consoleInput  
}

// export const test = () => {}
