const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    open: true,
    port: 3000
  },
  module: {
    rules: [
      // loading js
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
          {loader: "eslint-loader"}
        ]
      },


      // loading images
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[hash:7].[ext]'
            }
          }
        ]
      },

      // loading fonts
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      },

      // loading style
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(s[ca]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Game Tanks',
      template: "./public/index.html",
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ]
    })

  ]
}