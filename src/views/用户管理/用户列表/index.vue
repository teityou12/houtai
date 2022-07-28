<template>
  <div>
    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col>
          <!-- 前插槽 -->
          <el-row type="flex" justify="space-between" align="middle">
            <slot name="before" />
            <div style="margin: 15px 0">
              <el-input v-model="select" placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </div>
            <el-button type="primary" @click="showDialog = true">添加用户</el-button>
          </el-row>
        </el-col>
        <el-col>
          <!-- 后插槽 -->
          <slot name="after" />
        </el-col>
      </el-row>
      <el-table border :data="userslist">
        <el-table-column label="#" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="电话" prop="mobile" />

        <el-table-column label="角色" prop="role_name" />

        <el-table-column label="状态" prop="mg_state">
          <template v-slot="scope">
            <el-switch :value="scope.row.enableState" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog = true"
            />
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(row.id)"
            />
            <el-button type="warning" size="mini" icon="el-icon-setting" />
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible="showEditDialog" title="编辑用户">
        <el-form
          ref="editUser"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="用户名称">
            <el-input />
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

      <el-pagination
        :current-page="page.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <AddUser :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import AddUser from './components/AddUser'
import { getUserlist, deleteUser } from '@/api/user'
export default {
  filters: {},
  components: { AddUser },
  data () {
    return {
      formData: {

        email: '',
        mobile: ''
      },
      rules: {

        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, {
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格不步正确', trigger: 'blur'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式步正确', trigger: 'blur'
        }]
      },
      select: '',
      userslist: [],
      page: {
        query: '',
        pagenum: 1,
        pagesize: 4,
        total: null
      },
      showDialog: false,
      showEditDialog: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserlist()
  },
  methods: {

    async getUserlist () {
      const { total, users } = await getUserlist(this.page)

      this.userslist = users
      this.total = total
    },
    // newPage是最新的页码
    handleCurrentChange (newPage) {
      this.page.pagenum = newPage // 赋值最新的页码
      this.getUserlist() // 重新拉取数据
    },
    handleSizeChange (Newpagesize) {
      this.page.pagesize = Newpagesize
      this.getUserlist()
    },

    async deleteUser (id) {
      try {
        await this.$confirm('确认要删除该角色吗')

        await deleteUser(id)
        this.getUserlist()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async btnOk () {
      await this.$refs.addUser.validate()

      // await emitUser(this.formData)

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
.el-input {
  width: 400px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
