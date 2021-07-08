// Copyright 2019 Blockchain Technology Partners
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------------
/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack')
const merge = require('webpack-merge')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    new ErrorOverlayPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true,
  },
})
