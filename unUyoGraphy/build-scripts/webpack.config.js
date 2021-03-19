const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.join(__dirname, '../packages'),
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'development', // production | development
  optimization: {
    minimize: true,
  }
}