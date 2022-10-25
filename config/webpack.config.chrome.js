const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')

const isProd = process.env.NODE_ENV === 'production'

modules.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    background: resolve(__dirname, 'src', 'extension', 'background', 'index.ts'),
    popup: resolve(__dirname, 'src', 'extension', 'popup', 'index.ts'),
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: resolve(__dirname, 'assets', 'extension', 'resource'),
        to: resolve(__dirname, 'build'),
      },
      {
        from: resolve(__dirname, 'assets', 'extension', 'manifest', 'manifest-chrome.json'),
        to: resolve(__dirname, 'build', 'manifest.json'),
        transform(content, path) {
          const manifest = JSON.parse(content.toString())
          manifest.version = pkg.version
          return JSON.stringify(manifest)
        },
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: resolve(__dirname, 'src', 'extension', 'popup', 'index.html'),
      chunks: ['popup'],
    }),
  ],
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}
