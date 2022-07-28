<template>
  <div>
    <el-button type="primary" size="small">添加角色</el-button>

    <el-card style="margin-top=20px">
      <el-table border :data="Roleslist" row-key="id">
        <el-table-column label="#" type="index" />
        <el-table-column label="角色名称" prop="roleName" />

        <el-table-column label="角色描述" prop="roleDesc" />
        <el-table-column label="操作">
          <el-button type="primary" size="mini" icon="el-icon-edit"
            >_编辑</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >_删除</el-button
          >
          <el-button type="warning" size="mini" icon="el-icon-setting"
            @click= "showDialog=true">权限分配</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getRoleslist } from '@/api/roles'
import { getPowerlist } from '@/api/power'
export default {
  filters: {},
  components: {},
  data () {
    return {
      Roleslist: [],
      data: [],
      showDialog: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleslist()
    this.getPowerlist('tree')
  },
  methods: {
    async getRoleslist () {
      const res = await getRoleslist()
      console.log(res)
      this.Roleslist = res
    },
    async getPowerlist (type) {
      const res = await getPowerlist(type)
      console.log(res)
      this.data = res
    }

  }
}
</script>

<style scoped lang='scss'>
</style>

