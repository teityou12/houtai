<template>
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
          <el-button type="primary">添加用户</el-button>
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
          <el-button type="primary" size="mini" icon="el-icon-edit" />
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

    <el-pagination
      :current-page="page.page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </el-card>
</template>

<script>
import { getUserlist, deleteUser } from '@/api/user'
export default {
  filters: {},
  components: {},
  data () {
    return {
      select: '',
      userslist: [],
      page: {
        query: '',
        pagenum: 1,
        pagesize: 4,
        totalpage: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserlist()
  },
  methods: {

    async getUserlist () {
      const res = await getUserlist(this.page)
      console.log(res)
      this.userslist = res.users
      this.totalpage = res.total
    },
    // newPage是最新的页码
    handleCurrentChange (newPage) {
      this.page.page = newPage // 赋值最新的页码
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
