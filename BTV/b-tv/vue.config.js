// vue.config.js
module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  productionSourceMap: false,
  indexPath: 'backend.html',
//   outputDir: '../dist',
//   assetsDir: '/',
  configureWebpack: config => {
      output: {
          chunkFilename: 'chunk[id].js',
          config.devtool = 'source-map'
      }
  },
  chainWebpack: config => {
      if (process.env.NODE_ENV === 'development') {
          config.output.filename('[name].js').end()
      }
  }
}