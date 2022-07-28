<template>
  <div class="dashboard-container">
    <div class="dashboard-text">开心客栈</div>
    <ImageUpload />
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
