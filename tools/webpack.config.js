const webpack = require('webpack');
const { resolve: resolvePath } = require('path');

const DEBUG = !process.argv.includes('--release');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            minimize: !DEBUG,
          })}`,
          'sass-loader',
        ],
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: true, warnings: false },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],

  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
  },

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
};
