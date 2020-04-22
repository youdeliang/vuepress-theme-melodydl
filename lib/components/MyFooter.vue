<template>
   <div class="footer">
    <ul v-if="$themeConfig.SNS">
      <li v-for="(item, index) in snsList" :key="index">
        <a target="_blank" :href="item.url" v-if="item.font">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-stack-1x fa-inverse">{{item.font}}</i>
          </span>
        </a>
        <a target="_blank" :href="item.url" v-else>
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i :class="`fa ${item.fontAwesome} fa-stack-1x fa-inverse`"></i>
          </span>
        </a>
      </li>
    </ul>
    <p class="copyright text-muted">
      Copyright &copy; {{ `${$themeConfig.title} ${new Date().getFullYear()}` }}
      <br />
      theme by
      <router-link to="/">{{$themeConfig.title}}</router-link>&nbsp;|
      <iframe
        v-if="$themeConfig.gitbtn"
        :src="$themeConfig.gitbtn.src"
        style="margin-left: 2px; margin-bottom:-5px;"
        :frameborder="$themeConfig.gitbtn.frameborder"
        :scrolling="$themeConfig.gitbtn.scrolling"
        :width="$themeConfig.gitbtn.width"
        :height="$themeConfig.gitbtn.height"
      ></iframe>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snsList: []
    }
  },
  mounted() {
    this.snsList = this.$themeConfig.SNS;
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML += '<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
    document.getElementsByTagName('head')[0].innerHTML = headHTML;
  }
}
</script>
<style lang="stylus" scoped>
.footer {
  font-color: #fff;
  text-align: center;
  ul {
    list-style: none;
    font-size: 20px;
    box-sizing: border-box;
    padding: 5px;
    li {
      display: inline;
      padding: 0 10px;
    }
  }
  .copyright {
    font-size: 14px;
    color: #777;
    a {
      color: #337ab7;
    }
  }
}
</style>