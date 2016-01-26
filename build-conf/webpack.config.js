var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
  {
    name: "browser",
    entry: {
      main: './src/main.js'
    },
    output: {
      path: './public/resources',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['transform-runtime', 'add-module-exports']
          }
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract("style", "css!sass")
        },
        {
          test: /\.(svg|png|jpg|gif)([\?]?.*)$/,
          exclude: /node_modules/,
          loader: "file-loader?name=images/[name].[ext]"
        },
        {
          test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
          exclude: /node_modules/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css"),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    ],
    externals: {
      "jquery": "jQuery"
    }
  }
];