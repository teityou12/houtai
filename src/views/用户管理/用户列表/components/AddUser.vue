<template>
  <div>
    <el-dialog :visible="showDialog" title="新增用户">
      <!-- 表单 -->
      <el-form
        ref="addUser"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" />
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
import { addUser } from '@/api/user'
export default {
  filters: {},
  components: {},
  props: {

    showDialog: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 4, message: '用户名为1-4位' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 1, max: 6, message: '密码为1-6位' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, {
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格不步正确', trigger: 'blur'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式步正确', trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async btnOk () {
      await this.$refs.addUser.validate()

      await addUser(this.formData)

      this.$parent.getUserlist && this.$parent.getUserlist()

      this.$parent.showDialog = false
    },

    async btnCancel () {
      this.formData = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.addUser.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
