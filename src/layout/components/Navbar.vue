<template>
  <div class="navbar" style="width: 100%">
    <!-- <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->
    <div class="app-breadcrumb">江苏开心客栈科技股份有限公司</div>

    <el-button @click.native="logout">退出</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import Hamburger from '@/components/Hamburger'

export default {
  components: {

    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  overflow: hidden;

  background-color: #a21b28;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .el-button {
    margin-right: 15px;
    color: #fff;
    background-color: black;
    text-align: center;

    width: 60px;
    height: 40px;
  }
}
</style>
