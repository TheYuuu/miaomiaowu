const shell = require('shelljs') 
const { resolve } = require('path')
const fs = require('fs')
const webpack = require('webpack')
const _ = require('lodash')
const r = url => resolve(process.cwd(), url)
const config = require('./config') //我们抽出的小程序主要的文件
const webpackConf = require('./webpack.conf') // webpack配置

const assetsPath = config.assetsPath

shell.rm('-rf', assetsPath)
shell.mkdir(assetsPath)

const renderConf = webpackConf
const entry = () => _.reduce(config.json.pages, (en, i) => {
  en[i] = resolve(__dirname, '../src/components/', `HelloWorld.vue`) //需要转成小程序的文件的地址
  return en
}, {}) //输出一个对象

renderConf.output = { //输出文件的配置
  path: config.assetsPath,
  filename: '[name].js'
}

renderConf.entry = entry()
// renderConf.entry.app = config.app

// 如果你不传入回调函数到 webpack 执行函数中，就会得到一个 webpack Compiler 实例。你可以通过它手动触发 webpack 执行器，或者是让它执行构建并监听变更。和 CLI API 很类似。Compiler 实例提供了以下方法
const compiler = webpack(renderConf) //导入的 webpack 函数需要传入一个 webpack 配置对象，当同时传入回调函数时就会执行 webpack 

fs.writeFileSync(resolve(config.assetsPath, './app.json'), JSON.stringify(config.json), 'utf8')//一步写入文件小程序的app.json
   
const callback = (err, stats) => {
    console.log('Compiler 已经完成执行。');
    if (err) process.stdout.write(err) //如果有报错，就在控制台打印出报错
};

compiler.run(callback)