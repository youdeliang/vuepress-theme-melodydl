<template>
   <div class="post-list">
    <article class="post">
      <router-link
        :to="{ name: 'Post', params: { url: item.url } }"
        v-for="(item, index) of listPosts"
        :key="index"
      >
        <h2 class="post_title">{{ item.title }}</h2>
        <div class="post_content-wrap">
          <div class="post_image"></div>
          <div class="post_content">
            <p 
              class="post_description"
              v-html="item.excerpt"
            />
            <div class="post_date">
              <i class="el-icon-date">{{ item.createdAt }}</i>
              <i class="el-icon-folder">{{ item.frontmatter.category }}</i>
            </div>
          </div>
        </div>
      </router-link>
    </article>
    <!-- <Aside></Aside> -->
  </div>
</template>

<script>
export default {
  name: 'PostList',
  computed: {
    listPosts () {
      return this.posts || this.$posts
    },
  },
  mounted() {
    console.log(this.listPosts, "postList")
  }
}
</script>

<style lang="stylus" scoped>
.post-list {
  display: flex;
  justify-content: center;
  flex-direction: row;
  .post {
    width: 50%;
    a {
      display: block;
      border-radius: 4px;
      margin: 50px 0;
      border: 1px solid #e8eaec;
      &:hover {
        box-shadow: 0px 0px 20px #e8eaec;
      }
    }
    .post_title {
      font-size: 14px;
      border-bottom: 1px solid #e8eaec;
      color: #17233d;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h2 {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 14px 16px;
      display: inline-block;
      line-height: 20px;
    }
    .post_content-wrap {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      .post_image {
        height: 130px;
        background-image: url(https://d1qmdf3vop2l07.cloudfront.net/yellow-sage.cloudvent.net/compressed/_min_/0d604e4a276ef596282a73cd64283ac7.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .post_content {
        display: flex;
        align-items: center;
        .post_description {
          text-align: justify;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 20px;
          padding: 10px 10px;
        }
        .post_date {
          i {
            margin-right: 10px;
          }
          [class^=el-icon-]:before {
            margin-right: 5px;
          }
          padding: 0 10px;
          position: absolute;
          bottom: 10px;
          color: #666666;
          font-size: 13px;
          font-weight: 400;
          right: 10px;
        }
      }
    }
  }
}
</style>
