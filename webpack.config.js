const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", "./client/index.js"],
  output: {
    path: "/",
    filename: "bundle.js",
    sourceMapFilename: "[name].js.map"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
    },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
                   presets: ['@babel/preset-react', '@babel/env'],
                   plugins:['source-map-support']
           },
          },
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        // test: /\.css$/
        test: /\.s[ac]ss$/i,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
         
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    })
  ]
};