var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: 'dist',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'es6-loader' }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  },
  devServer: {
    contentBase: 'dist'
  }
};
