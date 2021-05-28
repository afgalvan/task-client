const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],
  target: 'web',
  devServer: {
    port: 4000,
    contentBase: './dist',
  },
});
