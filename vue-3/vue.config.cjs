// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const { ModuleFederationPlugin } = webpack.container;

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // E necessario mudar para module para funcionar
        // corretamente com o checkout MF, que exporta um module
        // eslint-disable-next-line no-param-reassign
        args[0].scriptLoading = 'module';
        return args;
      });
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'home',
        filename: 'remoteEntry.js',
        remotes: {
          checkout: 'https://checkout.hub4all.io/remoteEntry.js',
        },
        remoteType: 'module',
        shared: {
          react: {
            eager: true,
            singleton: true,
          },
          'react-dom': {
            eager: true,
            singleton: true,
          },
        },
      }),
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
    experiments: {
      outputModule: true,
    },
    output: {
      library: {
        type: 'module',
      },
      environment: {
        module: true,
      },
    },
  },
});
