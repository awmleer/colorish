const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = () => {
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [],
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      hot: false,
      port: 8088,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
      ],
      proxy: [{
        context: ['/api'],
        target: 'http://127.0.0.1:8000',
        pathRewrite: {
          '^/api': ''
        }
      }],
    },
  })
}
