const path = require('path')

module.exports = {
  title: 'Top 的博客',
  description: '个人博客',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],

  evergreen: true,

  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-165839722-1',
    }],
  ],

  theme: path.resolve(__dirname, '../../lib'),
  themeConfig: {
    title: 'Top Blog',

    // aside personInfo
    personalInfo: {
      name: 'melodydl',
      avatar: '/avatar-top.jpeg',
      headerBackgroundImg: '/avatar-bg.jpeg',
      description: 'In me the tiger sniffs the rose<br/>心有猛虎，细嗅蔷薇',
      email: 'facecode@foxmail.com',
      location: 'Shanghai, China',
      // organization: '不知名某公司',
    },
    // Nav link
    nav: [
      { text: 'HOME', link: '/' },
      { text: 'ABOUT', link: '/about/' },
      { text: 'TAGS', link: '/tags/' },
    ],
    header: {
      home: {
        title: 'Top Blog',
        subtitle: '好好生活，慢慢相遇',
        headerImage: '/home-bg.jpeg',
      },
      tags: {
        title: 'Tags',
        subtitle: '遇见你花光了我所有的运气',
        headerImage: '/tags-bg.jpg',
      },
      postHeaderImg: '/post-bg.jpeg',
    },
    // footer sns
    sns: {
      csdn: {
        account: 'csdn',
        link: 'https://blog.csdn.net/weixin_44002432',
      },
      weibo: {
        account: 'weibo',
        link: 'https://weibo.com/u/5656925978',
      },
      juejin: {
        account: 'juejin',
        link: 'https://juejin.im/user/5ce784a0f265da1b8333673c',
      },
      zhihu: {
        account: 'zhihu',
        link: 'https://www.zhihu.com/people/sheng-tang-de-xing-kong',
      },
      github: {
        account: 'github',
        link: 'https://github.com/youdeliang',
      },
    },
    // footer github button
    footer: {
      gitbtn: {
        repository: 'https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-melodydl&type=star&count=true',
        frameborder: 0,
        scrolling: 0,
        width: '80px',
        height: '20px',
      },
      custom: `Copyright &copy; Top Blog 2020 <br /> 
        Theme By <a href='https://www.vuepress.cn/' target='_blank'>VuePress</a>
        | <a href='https://www.github.com/youdeliang/' target='_blank'>youdeliang</a>`,
    },
    pagination: {
      perPage: 5,
    },

    comments: {
      owner: 'youdeliang',
      repo: 'vuepress-theme-melodydl',
      clientId: 'd821e5499c1d72a78039',
      clientSecret: '7aee0783e9d4110041e604e7121b985655a49cf1',
      autoCreateIssue: true,
    },
  },
}
