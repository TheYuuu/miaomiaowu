const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MyPlugin = require('./MyPlugin.js');

module.exports = {
  entry: './src/t.vue', // 入口, 可以为相对路径, 当然绝对路径也没错
  output: { // 输出配置
    path: path.join(__dirname, './dist'), // 输出的目录
    filename: 'bundle.js' // 输出的文件名
  },
  plugins:[
    new MyPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: path.resolve(__dirname, './MyLoader.js'),
        options: {
          name: 'Alice'
        }
      }
    }]
  },
  mode: 'production' // 打包的模式, production | development
}