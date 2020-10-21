// vue.config.js
module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  productionSourceMap: false,
  indexPath: 'index.html',
  outputDir: '../client',
  configureWebpack: config => {
    output: {
      chunkFilename: 'chunk[id].js'
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.output.filename('[name].js').end()
    }
  }
}