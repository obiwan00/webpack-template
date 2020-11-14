const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin =
    require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const WebpackBundleAnalyzer =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();

const isDev = process.env.NODE_ENV === 'development'
const isAnalyzing = process.env.IS_ANALYZING === true
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        replaceAll: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      },
    },
  ]
  if (isProd) {
    loaders.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, 'postcss.config.js')
        },
        sourceMap: isDev,
      }
    })
  }
  loaders.push('resolve-url-loader')
  if (extra) {
    loaders.push(extra);
  }
  return loaders
}

const babelOptions = (...presets) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
  if (presets.length !== 0) {
    presets.map(el => options.presets.push(el))
  }
  return options;
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders;
}

const generateHtmlPlugins = (templateDir) => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles
      .filter(el => el.match(/\.html$/i))
      .map(item => {
        const fileName = item
        return new HtmlWebpackPlugin({
          filename: fileName,
          template: path.resolve(__dirname, 'src', fileName),
          minify: {
            collapseWhitespace: false,
          }
        })
      })
}

const htmlPlugins = generateHtmlPlugins('./src')

const plugins = () => {
  const base = [
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['^img?']
    }),
    new CopyWebpackPlugin(
        {
          patterns: [
            {
              from: path.resolve(__dirname, './src/img'),
              to: path.resolve(__dirname, 'dist/img')
            },
          ],
        }
    ),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
    }),
    new ImageminPlugin({
      disable: isDev,
      test: /\.(jpe?g|png|gif)$/i,
      pngquant: {
        quality: '85'
      },
      plugins: [imageminMozjpeg({quality: 85})]
    }),
  ]
  const baseWithHtml = htmlPlugins.concat(base)
  if (isAnalyzing) {
    baseWithHtml.push(new WebpackBundleAnalyzer())
  }
  return baseWithHtml
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './js/index.js'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4000,
    hot: isDev,
    /* watchContentBase: true, // <-- dont use this shit.
    *  !!! it's strongly reduce performance !!!
    */
  },
  plugins: plugins(),
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders({
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }),
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'url-loader?limit=30000&name=fonts/[name]-[hash].[ext]'
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=images/[name]-[hash].[ext]'
      }
    ]
  }
}
