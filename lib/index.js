
const path = require('path');
module.exports = (opts, ctx) => {
  // set default theme config
  Object.assign(opts, Object.assign({
    plugins: {},
  }, opts))
  const options = {
    plugins: [
      [require('./plugins/blog')],
      ['@vuepress/plugin-back-to-top'],
      ['vuepress-plugin-smooth-scroll', opts.plugins['smooth-scroll'] || {}]
      ['@vuepress/nprogress']
    ],
    enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
    
  }
  return options;
}