<template>
  <div>
    <el-upload
      class="upload-demo"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      fileList: []
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
