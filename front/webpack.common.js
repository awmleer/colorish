const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// TODO add tree shaking feature

// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();


module.exports = {

  entry: {
    'widget': './src/entries/widget.tsx',
    'app': './src/entries/app.tsx',
    'support': './src/entries/support.tsx',
    'admin': './src/entries/admin.tsx',
    'portal': './src/entries/portal.tsx',
    'widget-boot-up': './src/utils/widget-boot-up/widget-boot-up.ts',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'widget.html',
      chunks: ['widget']
    }),
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'app.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'support.html',
      chunks: ['support']
    }),
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'admin.html',
      chunks: ['admin']
    }),
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'portal.html',
      chunks: ['portal']
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
