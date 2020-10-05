/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/scripts/index.js'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../public'), to: 'public' },
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.hbs'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/error.hbs'),
      filename: 'errors/index.html',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    /*
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/skills.hbs'),
      filename: "skills/index.html",
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    */
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
