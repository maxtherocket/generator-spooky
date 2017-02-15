'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');
var _ = require('lodash');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = Object.assign({}, baseConfig, {
  entry: {
    app:[
      path.join(__dirname, '../src/index')
    ]
  },
  cache: false,
  devtool: 'cheap-module-source-map',
  plugins: [
    //new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dist"'
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "gsap": "gsap"
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"common", /* filename= */"common.bundle.js"),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css")
  ],
  module: defaultSettings.getDefaultModules(),
  sassLoader: {
    includePaths: [path.resolve(__dirname, "/../src")]
  }
});

config.output.publicPath = 'assets/';

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel!webpack-strip?strip[]=console.log',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

// _.extend(config.resolve.alias, {
//   'react': path.join(__dirname, '/../node_modules', 'react/dist/react.min'),
//   'react-dom': path.join(__dirname, '/../node_modules', 'react-dom/dist/react-dom.min')
// });

config.module.loaders.push({
  test: /\.scss/,
  loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader?sourceMap&outputStyle=expanded", {publicPath:'./'})
  //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!autoprefixer-loader!sass-loader?outputStyle=expanded")
});
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract("style-loader", "css-loader!resolve-url!postcss-loader", {publicPath:'./'})
  //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
});

module.exports = config;
