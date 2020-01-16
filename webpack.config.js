const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  entry: './app.js',
  output: {
    path: __dirname + '/www',
    filename: 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        loaders: 'file-loader',
        options: {
            name: '[path][name].[ext]',
            outputPath: '/',
            publicPath: '/',
            pngquant: {
              quality: '30-70',
              speed: 1
            },
        }
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ { loader: 'css-loader', options: { url: true } }, 'sass-loader' ],
        }),
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BrowserSyncPlugin({
      server: { baseDir: ['./www'] }
    }),
    new HtmlWebpackPlugin({
      favicon: 'images/favicon.ico',
      template: 'index.pug'
    }),
    new HtmlWebpackPlugin({
      favicon: 'images/favicon.ico',
      filename: './loggedin/index.html',
      template: 'loggedin.pug'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin('style.css')
  ]
}
