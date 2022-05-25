const path = require('path')
const { whenProd } = require('@craco/craco');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    plugins: [
      ...whenProd(() => [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            parse: {},
            compress: {
              warnings: false,
              drop_console: true, // 生产环境下移除控制台所有的内容
              drop_debugger: true, // 移除断点
              pure_funcs: ['console.log'] // 生产环境下移除console
            }
          }
        }),
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 1024,
          minRatio: 0.8
        })
      ], [])
    ],
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.join(path.dirname(paths.appBuild), 'dist'),
        publicPath: '/'
      };
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, "src/assets/style/var.less"),
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            sourceMap: false,
          }
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]__[hash:base64:5]',
            mode: (resourcePath) => {
              if (/(module|local)\.(less|css)$/i.test(resourcePath)) {
                return 'local';
              }
              return 'global';
            },
          }
        },
        babelPluginImportOptions: {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      }
    }
  ],
  devServer: {
    port: 8888
  }
}
