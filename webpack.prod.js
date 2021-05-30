const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const dotenvPath = `./${process.env.NODE_ENV}.env`;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: dotenvPath,
      safe: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.bundle.css',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          compress: true,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});
