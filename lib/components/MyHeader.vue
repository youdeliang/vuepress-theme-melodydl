<template>
  <header class="header-container">
    <!-- nav -->
    <nav class="navbar" :class="{show: isShow}">
      <h1>
        <router-link to="/">{{$themeConfig.title}}</router-link>
      </h1>
      <ul 
        :class="{ open: !isNavBtn }" 
        v-if="$themeConfig.nav"
      >
        <li v-for="(item, index) of navLinkList" :key="index">
          <a :href="item.link" v-if="item.type=='url'">
            {{item.text}}
          </a>
            <router-link tag='a' v-else :to="item.link">{{item.text}}</router-link>
        </li>
      </ul>
      <!-- @media nav button -->
      <div
        id="nav-icon1"
        :class="{ open: isNavBtn }"
        @click="showNavBtn"
      >
        <span v-for="count in 3" :key="count"></span>
      </div>
    </nav>
    <!-- backgound and title -->
    <div
      v-show="!isShow" 
      class="title"
      :style="style"
    >
      <h1>{{title}}</h1>
      <p>{{subTitle}}</p>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navLinkList: [], // navbar list
      isNavBtn: false, // @media nav is button
      scrollHeight: '',
      isShow: false, // scroll up nav show
    }
  },
  mounted() {
    this.navLinkList = this.$themeConfig.nav;
    this.hasScroll();
  },
  computed: {
    title() {
      return this.$frontmatter.title || null;
    },
    subTitle() {
      return this.$frontmatter.subTitle || null;
    },
    backgroundImg() {
      return this.$frontmatter['header-image'] || null;
    },
    style() {
      if (this.backgroundImg) {
        let url = this.backgroundImg;
        if (Array.isArray(url)) {
          url = this.randomArr(url);
        }
        return {
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-attachment': 'scroll',
          'background-image': `url(${url})`,
        }
      }
      return {}
    }
  },
  methods: {
    hasScroll() {
      const _this = this;
      window.addEventListener("scroll", function(e){
        let scrollPos = _this.getScrollTop();
        let h = scrollPos - _this.scrollHeight;
        _this.scrollHeight = scrollPos;
        h < 0 
          ? scrollPos !== 0
            ? _this.isShow = true
            : _this.isShow = false 
          : _this.isShow = false
      })
    },
    getScrollTop() {
      var scrollPos = window.pageYOffset 
        || document.documentElement.scrollTop
        || document.body.scrollTop;
      return scrollPos;
    },
    showNavBtn() {
      this.isNavBtn = !this.isNavBtn;
    },
    randomArr (arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    },
  }
}
</script>

<style lang="stylus" scoped>
@require "../styles/variables.styl"
.header-container {
  color: #fff;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    z-index: -555;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
  }
  .navbar {
    position: absolute;
    top 0px;
    left: 0;
    z-index: 999;
    height: 60px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 18px;
      padding: 20px;
      color: #fff;
      &:hover {
        color: $accentColor;
      }
    }
    ul {
      align-self: center;
      text-align: right;
      li {
        display: inline;
        font-weight: 800;
        font-size: 12px;
        padding: 20px;
        &:hover {
          color: $accentColor
        }
        color: #fff;
      }
    }
  }
  .title {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      position: relative;
      z-index: 99;
      font-size: 5rem;
    }
    p {
      position: relative;
      z-index: 99;
      font-size: 18px;
    }
  }
  .show {
    position: fixed;
    background: white;
    box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.239216) 0px 1px 4px;
    opacity: 0.8;
    h1 {
      color: #404040;
    }
    ul li {
      color: #404040
    }
  }
  /* nav button css */
  #nav-icon1 {
    display: none;
    width: 25px;
    margin-right: 20px;
    height: 25px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;

    span {
      position: absolute;
      height: 4px;
      width: 100%;
      background: #fff;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
    }
  }
  #nav-icon1 span:nth-child(1) {
    top: calc(50% - 8px);
  }

  #nav-icon1 span:nth-child(2) {
    top: 50%;
  }

  #nav-icon1 span:nth-child(3) {
    top: calc(50% + 8px);
  }

  #nav-icon1.open span:nth-child(1) {
    top: 50%;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  #nav-icon1.open span:nth-child(2) {
    opacity: 0;
    left: -60px;
  }

  #nav-icon1.open span:nth-child(3) {
    top: 50%;
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
}
</style>
