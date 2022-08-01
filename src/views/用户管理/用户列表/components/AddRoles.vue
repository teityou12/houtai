<template>
  <div>
    <el-dialog :visible="rolesDialog" title="分配角色">
      <!-- 表单 -->
      <el-form>
        <el-form-item label="当前角色：" width:80px>
          <el-input />
        </el-form-item>
        <el-form-item label="分配新角色：">
          <el-input />
        </el-form-item>
        <el-form-item label="分配新角色：">
          <el-autocomplete
            v-model="state1"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          />
        </el-form-item>
      </el-form>

      <template slot="footer" style="flex" justify="end">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addroles } from '@/api/user'
export default {
  filters: {},
  components: {},
  props: {

    rolesDialog: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async btnOk () {
      // await this.$refs.addroles.validate()

      await addroles(this.formData)

      this.$parent.getUserlist && this.$parent.getUserlist()

      this.$parent.rolesDialog = false
    },

    async btnCancel () {
      this.formData = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.addroles.resetFields()
      this.$emit('update:rolesDialog', false)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
