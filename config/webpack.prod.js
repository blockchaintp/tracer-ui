/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack'
import merge from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'

import common from './webpack.common'

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {},
      }),
    ],
  },
  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
})
