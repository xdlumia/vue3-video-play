/*
 * @Author: web.王晓冬
 * @Date: 2020-03-18 12:36:57
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-25 20:22:03
 * @Description: file content
 */
// shell字体颜色 默认=0，黑色=30，红色=31，绿色=32，黄色=33，蓝色=34，紫色=35，天蓝色=36，白色=3

const shell = require('shelljs');
const readlineSync = require('readline-sync');
const path = require('path');
let packageJSON = require(path.resolve('package.json'));
const chalk = require('chalk');

const defaultLog = (log) => console.log(chalk.blue(`------${log}-----`))
const errorLog = (log) => console.log(chalk.red(`------${log}-----`))
const successLog = (log) => console.log(chalk.green(`------${log}-----`))
// 当前版本
const currentVersion = packageJSON.version
// 版本标识
const [vrsionFlag] = process.argv.slice(2)
// 获取git当前分支
let currentBranch = shell.exec('git symbolic-ref --short -q HEAD', {
    async: false,
    silent: true
}).stdout.trim();
if (currentBranch != 'dev') {
    shell.echo("\033[1;31m Error: 当前是 " + currentBranch + " 分支 请切换到dev分支\033[0m");
    return
}

// 新版本
var confirm = readlineSync.question(`Current is "v${currentVersion}".\n\
//    -- p:patch m:minor s:major n:Exit default:patch
//    -- are you sure? (p/s/m/n)`)
// 直接升级小号
if (confirm.trim() == '' || confirm.trim().toLowerCase() == 'p') {
    shell.exec('npm version patch')
}
// 则升级一位中号，大号不动，小号置为空
else if (confirm.trim().toLowerCase() == 'm') {
    shell.exec('npm version minor')
}
// 升级一位大号，其他位都置为0
else if (confirm.trim().toLowerCase() == 's') {
    shell.exec('npm version major')
} else {
    shell.echo("\033[1;31m Error: 输入错误 已自动退出\033[0m")
    shell.exit()
}

shell.exec('git checkout master');
shell.exec('git pull');
shell.exec('git merge dev');
if (shell.exec('git push origin master --tags').code != 0) {
    shell.echo("\033[1;31mError: git push ogigin master 失败! 已退出\033[0m");
    shell.exec('git checkout dev');
    shell.exit()
    return
}

shell.exec('git checkout dev');
shell.exec('git rebase master');
// shell.exec('git push origin dev');
if (shell.exec('git push origin dev').code != 0) {
    shell.echo("\033[1;31mError: git push origin dev 失败! 已退出\033[0m");
    shell.exec('git checkout dev');
    shell.exit()
    return
}
if (shell.exec('npm publish').code != 0) {
    shell.echo("\033[1;31mError: npm publish 失败! 已退出\033[0m");
    shell.exit()
    return
}
shell.echo("\033[1;32mSuccess Publish success!\033[0m");
shell.exit()