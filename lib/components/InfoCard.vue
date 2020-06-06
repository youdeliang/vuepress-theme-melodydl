/* eslint-disable no-dupe-keys */
<template>
  <div class="info-card">
    <div
      class="info-card-header"
      :style="headerStyle"
    >
      <img
        class="info-avatar"
        :src="avatar"
        :alt="name"
      >
    </div>

    <div class="info-card-body">
      <section class="info-name">
        {{ nickName }}
      </section>
      <!-- eslint-disable vue/no-v-html -->
      <section
        v-if="description"
        class="info-desc"
        v-html="description"
      />

      <section class="info-contact">
        <section v-if="location">
          <IconInfo
            class="info-email"
            type="location"
          >
            {{ location }}
          </IconInfo>
        </section>

        <section v-if="organization">
          <IconInfo
            class="info-organization"
            type="organization"
            :title="organization"
          >
            {{ organization }}
          </IconInfo>
        </section>

        <section v-if="email">
          <IconInfo
            class="info-email"
            type="email"
          >
            {{ email }}
          </IconInfo>
        </section>
      </section>
    </div>
    <div class="info-card-footer">
      <p
        v-if="sns"
        class="footer-sns-link"
      >
        <a
          v-for="(item, name) in sns"
          :key="name"
          target="_blank"
          :href="item.link"
          class="sns-link"
        >
          <IconSns
            :name="name"
            :account="item.account"
            size="35px"
          />
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import IconSns from '@theme/components/IconSns.vue'
import IconInfo from '@theme/components/IconInfo.vue'
export default {
  components: {
    IconSns,
    IconInfo,
  },
  computed: {
    sns () {
      return this.$themeConfig.sns || null
    },

    info () {
      return this.$themeConfig.personalInfo || {}
    },

    avatar () {
      return this.info.avatar || '/avatar-top.jpeg'
    },

    nickName () {
      return this.info.name || 'Unknown'
    },

    description () {
      return this.info.description || null
    },

    location () {
      return this.info.location || null
    },

    organization () {
      return this.info.organization || null
    },

    email () {
      return this.info.email || null
    },

    headerBackgroundImg () {
      return this.info.headerBackgroundImg || null
    },

    headerStyle () {
      if (this.headerBackgroundImg) {
        return {
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-attachment': 'scroll',
          'background-image': `url(${this.headerBackgroundImg})`,
        }
      }

      return {}
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

$headerBgHeight = 150px
$avatarHeight = 120px
.info-card
  padding 0
  a
    color $grayTextColor
    font-weight normal
  .info-card-header
    height $headerBgHeight
    margin-bottom $avatarHeight * 0.5
    border-top-left-radius 5px
    border-top-right-radius 5px
    .info-avatar
      display block
      width $avatarHeight
      height $avatarHeight
      margin 0 auto
      border 3px solid #fff
      border-radius 50%
      box-shadow: 0 0 2px alpha(black, 0.2)
      transform translateY($headerBgHeight - $avatarHeight * 0.5)
  .info-card-body
    cursor default
    padding 1rem
    border-bottom 1px solid $borderColor
    text-align center
    .info-name
      display block
      font-size 1.5rem
      font-weight bold
      text-align center
    .info-desc
      margin 1rem 0
      line-height 2rem
    .info-contact
      color $grayTextColor
      word-break break-all
      line-height 160%
      .icon
        fill $grayTextColor
  .info-card-footer
    text-align center
    padding 0.5rem

</style>
