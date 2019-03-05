const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
require('babel-polyfill');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {
  CheckerPlugin
} = require('awesome-typescript-loader');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');


const BUILD_DIR = path.resolve(__dirname, 'src/dist/public');
const APP_KING_DIR = path.resolve(__dirname, 'src/king');
const APP_KONG_DIR = path.resolve(__dirname, 'src/kong');
const APP_AVATAR_DIR = path.resolve(__dirname, 'src/vue');
const APP_ANGULAR_DIR = path.resolve(__dirname, 'src/angular');

module.exports = {
  cache: true,
  entry: {
    polyfills: './src/angular/polyfills.ts',
    king: ['babel-polyfill', APP_KING_DIR + '/index.js'],
    kong: [APP_KONG_DIR + '/index.js'],
    vue: [APP_AVATAR_DIR + '/main.js'],
    angular: [APP_ANGULAR_DIR + '/app.ts']
  },
  output: {
    path: path.resolve('./src/dist/public'),
    filename: '[name].js',
  },
  module: {
    rules: [{
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
        use: [
          "to-string-loader",
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
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
      },
      {
        test: /\.tsx?$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
        }]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(BUILD_DIR, 'lib-manifest.json')),
      extensions: ['.js', '.jsx'],
    }),
    new VueLoaderPlugin(),
    new CheckerPlugin(),
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve(__dirname, 'src/angular'), {}
    ),
    new FilterWarningsPlugin({
      exclude: /System.import/
    })

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