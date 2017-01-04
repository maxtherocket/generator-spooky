'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const libPath = path.join(__dirname, '/../src/lib');

require('dotenv').config();
const host = process.env.HOST || '127.0.0.1';
const dfltPort = process.env.PORT || 8000;

function getDefaultModules() {
  return {
    // preLoaders: [{
    //     test: /\.(js|jsx)$/,
    //     include: srcPath,
    //     loader: 'eslint-loader'
    //   }],
    loaders: [
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline?removeSVGTagAttrs=false'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  libPath: libPath,
  publicPath: '/assets/',
  port: dfltPort,
  host: host,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  }
};
