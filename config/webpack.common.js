/* eslint-disable import/no-extraneous-dependencies */
import { ProgressPlugin } from 'webpack'
import { resolve as _resolve } from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export const entry = './src/index.js'
export const output = {
  path: _resolve(__dirname, '..', 'dist'),
  filename: '[name].[hash].bundle.js',
  chunkFilename: '[name].[hash].bundle.js',
  publicPath: '/',
}
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
  ],
}
export const resolve = {
  modules: [_resolve(__dirname, '..', 'src'), 'node_modules']
}
export const plugins = [
  new ProgressPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html',
    hash: true,
  }),
  new CopyWebpackPlugin([{
    from: 'src/assets',
    to: '',
  }]),
]
export const optimization = {
  splitChunks: {
    chunks: 'all',
  },
}
