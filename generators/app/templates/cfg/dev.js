'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
require('dotenv').config();
var myIp = require('my-ip');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

var host = process.env.HOST || '127.0.0.1';

let config = Object.assign({}, baseConfig, {
  entry: {
    app:[
      'webpack-dev-server/client?http://' + host + ':' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    //new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dev"'
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "gsap": "gsap"
    }),
    new BowerWebpackPlugin({
      modulesDirectories: [path.resolve(__dirname, "/../src/lib")],
      searchResolveModulesDirectories: false
    }),
    //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"common", /* filename= */"common.bundle.js"),
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    //new ExtractTextPlugin("[name].css")
  ],
  module: defaultSettings.getDefaultModules(),
  sassLoader: {
    includePaths: [path.resolve(__dirname, "/../src")]
  }
});

config.devServer.host = host;
//config.output.publicPath = 'http://' + host + ':' + defaultSettings.port + '/assets/';

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});
config.module.loaders.push({
  test: /\.scss/,
  loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap&outputStyle=expanded'
  //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!autoprefixer-loader!sass-loader?outputStyle=expanded")
});
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style-loader!css-loader!resolve-url!postcss-loader'
  //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
});

//console.log('config:', config);

module.exports = config;
