const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// TODO add tree shaking feature

// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();


module.exports = {

  entry: {
    'index': './src/entries/index.tsx',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'index.html',
      chunks: ['index']
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   }
  // },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        // options: {
        //   getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        // },
        exclude: [
          /node_modules/,
          /__test__/
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  }

}
