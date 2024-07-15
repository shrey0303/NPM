const path = require('path')

/**
 * @type {Configuration}
 */
const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    openPage: 'index.html',
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    port: 3000,
    publicPath: '/dist/',
  },
}

module.exports = config
