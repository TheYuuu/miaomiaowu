const path = require('path');
const name = require('./package.json').name;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const publicPath = process.env.NODE_ENV === 'development' ? '' : `//localhost:5500/child/vue-sub-dir`;

module.exports = {
  outputDir: '../dist/child/' + name + '-dir/',
  publicPath,
  assetsDir: 'static',
  filenameHashing: true,
  chainWebpack: (config) => {
    const fontRule = config.module.rule('fonts');
    fontRule.uses.clear();
    fontRule
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'fonts/[name].[hash:8].[ext]',
        publicPath
      })
      .end()

    const imgRule = config.module.rule('images');
    imgRule.uses.clear();
    imgRule
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]',
        publicPath
      })
      .end()
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
    }
  }
}