
const { path, datatypes: { isString } } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  const {
    // pageEnhancers = [],
    // postsDir = '_posts',
    categoryIndexPageUrl = '/category/',
    tagIndexPageUrl = '/tag/',
    // permalink = '/:year/:month/:day/:slug',
  } = options

  return {
    async ready () {
      const { pages } = ctx
      const tagMap = {}
      const categoryMap = {}

      const curryHandler = (scope, map) => (key, pageKey) => {
        if (key) {
          if (!map[key]) {
            map[key] = {}
            map[key].path = `${scope}${key}.html`
            map[key].pageKeys = []
          }
          map[key].pageKeys.push(pageKey)
        }
      }

      const handleTag = curryHandler(tagIndexPageUrl, tagMap)
      const handleCategory = curryHandler(categoryIndexPageUrl, categoryMap)

      pages.forEach(({
        key,
        frontmatter: {
          tag,
          tags,
          category,
          categories,
        },
      }) => {
        if (isString(tag)) {
          handleTag(tag, key)
        }
        if (Array.isArray(tags)) {
          tags.forEach(tag => handleTag(tag, key))
        }
        if (isString(category)) {
          handleCategory(category, key)
        }
        if (Array.isArray(categories)) {
          categories.forEach(category => handleCategory(category, key))
        }
      })

      ctx.tagMap = tagMap
      ctx.categoryMap = categoryMap
    },

    async clientDynamicModules () {
      return [
        {
          name: 'tag.js',
          content: `export default ${JSON.stringify(ctx.tagMap, null, 2)}`,
        },
        {
          name: 'category.js',
          content: `export default ${JSON.stringify(ctx.categoryMap, null, 2)}`,
        },
      ]
    },

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
  }
}
