const pkg = require('./package');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'UVA Darden Global Corporate Patent Dataset',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description,
      },
    ],
    script: [],
    link: [
      {
        rel: 'canonical',
        href: 'https://patents.darden.virginia.edu',
      },
      {
        rel: 'preload',
        href: '/style/fonts/FranklinGothicURW/FranklinGothicURW-Hea.woff',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/style/fonts/FranklinGothicURW/FranklinGothicURW-Med.woff',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/style/fonts/FranklinGothicURW/FranklinGothicURW-Boo.woff',
        as: 'font',
        crossorigin: 'anonymous',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#e57200',
    height: '10px',
    continuous: true,
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/style/uikit-custom.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    './plugins/filters.js',
    './plugins/globals.js',
    './plugins/uikit.js',
  ],
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-139855135-1',
      },
    ],
  ],
  vue: {
    config: {
      productionTip: false,
      // Following two needed for https://github.com/vue-perf-devtool/vue-perf-devtool
      devtools: false,
      performance: false,
    },
  },
  build: {
    // plugins: [
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'static',
    //     generateStatsFile: false,
    //     openAnalyzer: false,
    //     logLevel: 'info',
    //   }),
    // ],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = 'source-map';
        // console.log('config.devtool', config.devtool);
      } else {
        config.devtool = 'inline-source-map';
        // console.log('config.devtool', config.devtool);
      }
      config.module.rules.push(
        {
          test: /\.csv$/,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.md$/,
          use: [
            'vue-loader', //
            'vue-md-loader',
          ],
        },
      );
      // console.log(config);
    },
  },
};
