const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, '../example/index.tsx'),
  output: {
    path: path.resolve(process.cwd(), './publish'),
    publicPath: process.env.PUBLIC_URL || '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    publicPath: '/',
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  mode: 'development', // production | development
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
      filename: 'index.html',
      title: 'unUyo Graphy'
    })
  ]
}