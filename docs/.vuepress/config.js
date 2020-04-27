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

    // aside personInfo
    personalInfo: {
      name: 'melodydl',
      avatar: '/avatar-top.jpeg',
      headerBackgroundImg: '/avatar-bg.jpeg',
      description: 'Happy Coding<br/>Happy Life',
      email: 'topyou0316@gmail.com',
      location: 'Shanghai, China',
      // organization: '',
    },
    // Nav link
    nav: [ 
      {text: 'HOME', link: '/' },
      {text: 'ABOUT', link: '/about/'},
      {text: 'TAGS', link: '/tags/'}      
    ],
    header: {
      home: {
        title: 'You', 
        subtitle: 'ii', 
        headerImage: '/header4.jpeg'
      },
      tags: {
        title: 'Tags', 
        subtitle: 'iitags', 
        headerImage: '/tags-bg.jpg'
      },
      postHeaderImg: '/header1.jpeg',
    },
    // footer sns
    sns: {
      "jianshu": { 
        account: "jianshu", 
        link: "https://www.jianshu.com/u/5dddaee8f351", 
      },
      "juejin": { 
        account: "juejin",
        link: "https://juejin.im/user/5ce784a0f265da1b8333673c"
      },
      "zhihu": { 
        account: "zhihu",
        link: "https://www.zhihu.com/people/sheng-tang-de-xing-kong"
      },
      "github": { 
        account: "github",
        link: "https://github.com/youdeliang"
      }
    },
    // footer github button
    footer: {
      gitbtn: {
        repository: "https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-top&type=star&count=true",
        frameborder: 0,
        scrolling: 0,
        width: "80px",
        height: "20px"
      },
      custom: `Copyright &copy; Top Blog 2020 <br /> 
        Theme By <a href="https://www.vuepress.cn/" target="_blank">VuePress</a>
        | <a href="https://www.github.com/youdeliang/" target="_blank">youdeliang</a>`
    },
    pagination: {
      perPage: 5,
    },

    comments: {
      owner: 'youdeliang',
      repo: 'vuepress-theme-melody',
      clientId: 'Iv1.8197e5215c6ecefa',
      clientSecret: '3308a6e368283725b31fa444b4a050fbb66afb0d',
      autoCreateIssue: false,
    },

    search: true,
    searchMaxSuggestions: 10
  }
}