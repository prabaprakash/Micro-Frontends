const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
require('babel-polyfill');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const BUILD_DIR = path.resolve(__dirname, 'src/dist/public');
const APP_KING_DIR = path.resolve(__dirname, 'src/king');
const APP_KONG_DIR = path.resolve(__dirname, 'src/kong');
const APP_AVATAR_DIR = path.resolve(__dirname, 'src/vue');
module.exports = {
  cache: true,
  entry: {
    king: ['babel-polyfill', APP_KING_DIR + '/index.js'],
    kong: [APP_KONG_DIR + '/index.js'],
    vue: [APP_AVATAR_DIR + '/main.js']
  },
  output: {
    path: path.resolve('./src/dist/public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.vue'],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(BUILD_DIR, 'lib-manifest.json')),
      extensions: ['.js', '.jsx'],
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
  },
};
