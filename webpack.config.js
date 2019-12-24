const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackBar = require('webpackbar')

const IS_DEV = process.env.NODE_ENV === 'development'
const TS_CONFIG = path.resolve(__dirname, './tsconfig.json')

const devOnly = list => (IS_DEV ? list : [])
const prodOnly = list => (!IS_DEV ? list : [])

/** @type { webpack.Configuration } */
const config = {
  entry: {
    app: [...devOnly(['react-hot-loader/patch']), 'core-js', './src']
  },

  context: path.resolve(__dirname),

  mode: IS_DEV ? 'development' : 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG })],
    extensions: ['.tsx', '.ts', '.js'],
    alias: IS_DEV ? { 'react-dom': '@hot-loader/react-dom' } : {}
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
              presets: [
                ['@babel/preset-env', { modules: 'commonjs' }],
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              plugins: [
                'react-require',
                '@babel/plugin-transform-runtime',
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ...devOnly(['react-hot-loader/babel'])
              ]
            }
          }
        ],
        exclude: /node_modules\/(?!react-intl|intl-messageformat|intl-messageformat-parser)/
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
          {
            use: [
              IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  localsConvention: 'camelCase',
                  modules: {
                    localIdentName: IS_DEV
                      ? '[local]--[hash:base64:5]'
                      : '[hash:base64:5]'
                  },
                  importLoaders: 1,
                  sourceMap: IS_DEV
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: IS_DEV,
                  plugins: [
                    require('postcss-import')({
                      path: [path.join(__dirname, './src/theme')]
                    }),
                    require('postcss-mixins')({
                      mixinsDir: path.join(__dirname, './src/theme/mixins')
                    }),
                    require('postcss-preset-env')({
                      stage: 3,
                      features: {
                        'nesting-rules': true
                      }
                    }),
                    require('postcss-inline-svg')(),
                    require('postcss-svgo')()
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              emitFile: true,
              limit: 8092,
              name: 'images/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: TS_CONFIG,
      checkSyntacticErrors: true
    }),

    new CopyPlugin([{ from: './src/assets' }]),

    new HtmlPlugin({
      template: path.resolve(__dirname, './views/index.ejs'),
      templateParameters: {
        hash: process.env.BUILD_ID || '',
        isDev: IS_DEV
      },
      inject: false
    }),

    ...devOnly([new WebpackBar()]),

    ...prodOnly([
      new MiniCssExtractPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CompressionPlugin({})
    ])
  ],

  devtool: IS_DEV ? 'inline-source-map' : undefined,

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    minimize: !IS_DEV,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: /license|@preserve|@license|@cc_on/gi
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  devServer: {
    hot: true,
    inline: true,
    port: process.env.PORT || 3011,
    contentBase: [path.join(__dirname, '/dev-assets')],
    historyApiFallback: true
  }
}

module.exports = config
