const path = require("path");

module.exports = {
  title: 'Top 的博客 ｜ Top Blog',
  description: '个人博客',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  serviceWorker: true,
  base: '/',
  theme: path.resolve(__dirname,'../../lib'),
  themeConfig: {
    title: 'Top Blog',

    // Nav link
    nav: [ 
      {text: "HOME", link: '/' },
      {text: 'ABOUT', link: '/about/'},
      {text: 'TAGS', link: '/tags/'}      
    ],
    // footer sns
    SNS: [
      { url: "https://www.jianshu.com/u/5dddaee8f351", font: "简" },
      { url: "https://juejin.im/user/5ce784a0f265da1b8333673c", font: "掘" },
      { url: "https://github.com/youdeliang", fontAwesome: "fa-github" },
      { url: "https://github.com/youdeliang", fontAwesome: "fa-twitter" },
    ],
    // footer github button
    gitbtn: {
      src: "https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-top&type=star&count=true",
      frameborder: 0,
      scrolling: 0,
      width: "100px",
      height: "20px"
    },
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
    search: true,
    searchMaxSuggestions: 10
  }
}