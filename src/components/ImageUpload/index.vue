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
import { addpicture } from '@/api/goods'
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKID33tkPr7LMFwVt53nLgqm9KRPBkLkyyqb',
  SecretKey: 'lJfswnkYB9tQksoaBev0scBYiiW7pY9a'
})
export default {
  filters: {},
  components: {},
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      percent: 0
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async addpicture (file) {
      const res = await addpicture(file)
      console.log(res)
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleRequest (obj) {
      var that = this
      console.log(obj)
      cos.putObject({
        Bucket: 'heima321-1313062293', /* 必须 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + obj.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: obj.file, // 上传文件对象
        onProgress: function (progressData) {
          that.percent = Math.ceil(progressData.loaded / progressData.total * 100)
        }
      }, (err, data) => {
        console.log(err || data)
        this.src = data.Location
      })
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
