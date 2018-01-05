var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BabelPlugin = require('babel-webpack-plugin')
require('babel-polyfill')
module.exports = [
  {
    name: 'browser',
    entry: {
      main: ['babel-polyfill', './src/main.js'],
    },
    output: {
      path: './public',
      filename: 'resources/bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: false,
            presets: ['react', 'es2015', 'stage-0'],
            plugins: [
              'transform-runtime',
              'add-module-exports',

            ],
          },
        },

        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
        },
        {
          test: /\.(svg|png|jpg|gif)([\?]?.*)$/,
          exclude: /node_modules/,
          loader: 'file-loader?name=/images/[name].[ext]',
        },
        {
          test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
          exclude: /node_modules/,
          loader: 'url-loader',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('resources/styles.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new BabelPlugin({
        test: /\.(js|jsx)$/,
        presets: [
          [
            'env',
            {
              loose: true,
              modules: false,
              targets: {
                browsers: [
                  '>1%',
                ],
              },
              useBuiltIns: true,
            },
          ],
        ],
        sourceMaps: false,
        compact: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('preproduction'),
        },
      }),
    ],
    externals: {
      'jquery': 'jQuery',
    },
  },
]
