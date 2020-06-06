
const path = require('path')
module.exports = (opts, ctx) => {
  // set default theme config
  Object.assign(opts, Object.assign({
    plugins: {},
    defaultPages: {},
    header: {},
    comments: {},
  }, opts))

  const { comments, defaultPages, header } = opts

  const options = {
    name: 'vuepress-theme-melodydl',
    plugins: [
      [require('./plugins/blog')],
      ['@vuepress/plugin-back-to-top'],
      ['vuepress-plugin-container', { type: 'tip' }],
      ['vuepress-plugin-container', { type: 'warning' }],
      ['vuepress-plugin-container', { type: 'danger' }],
      ['vuepress-plugin-smooth-scroll', opts.plugins['smooth-scroll'] || {}],
      ['@vuepress/nprogress'],
      ['vuepress-plugin-table-of-contents'],
      [
        '@vssue/vuepress-plugin-vssue',
        comments !== false
          ? Object.assign({
            platform: 'github',
          }, comments)
          : false,
      ],
    ],
    chainWebpack (config, isServer) {
      // to use jsx syntax with evergreen config
      if (ctx.siteConfig.evergreen) {
        config.module
          .rule('js')
          .test(/\.js$/)
          .exclude.add(filePath => {
            if (filePath.startsWith(path.resolve(__dirname))) {
              return false
            }
            return true
          }).end()
          .use('cache-loader')
          .loader('cache-loader')
          .options({
            cacheDirectory: ctx.cacheDirectory,
            cacheIdentifier: ctx.cacheIdentifier,
          })
          .end()
          .use('babel-loader')
          .loader('babel-loader')
          .options({
            babelrc: false,
            configFile: false,
            presets: [
              require.resolve('@vue/babel-preset-jsx'),
            ],
          })
      }
    },
    async ready () {
      if (defaultPages.layout !== false) {
        await ctx.addPage({
          permalink: '/',
          frontmatter: {
            title: header.home.title,
            subtitle: header.home.subtitle,
            headerImage: header.home.headerImage,
            layout: 'layout',
          },
        })
      }

      if (defaultPages.tags !== false) {
        await ctx.addPage({
          permalink: '/tags/',
          frontmatter: {
            title: header.tags.title,
            subtitle: header.tags.subtitle,
            headerImage: header.tags.headerImage,
            layout: 'tags',
          },
        })
      }
    },

    globalUIComponents: 'Iconfont',

    enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
  }
  return options
}
