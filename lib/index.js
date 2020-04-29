
const path = require('path');
module.exports = (opts, ctx) => {
  // set default theme config
  Object.assign(opts, Object.assign({
    plugins: {},
    defaultPages: {},
    header: {},
    comments: {}
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
      ['vuepress-plugin-smooth-scroll', true],
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

    enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
  }
  return options;
}