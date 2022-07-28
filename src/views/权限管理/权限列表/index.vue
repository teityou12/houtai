<template>
  <div>
    <el-card>
      <el-table border :data="Powerlist">
        <el-table-column label="#" type="index" />
        <el-table-column label="权限名称" prop="authName" />
        <el-table-column label="路径" prop="path" />
        <el-table-column label="权限等级" prop="level">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level==='0'">等级一</el-tag>
            <el-tag v-if="scope.row.level === '1'" type="success">等级二</el-tag>
            <el-tag v-if="scope.row.level === '2'" type="warning">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import { getPowerlist } from '@/api/power'
export default {
  filters: {},
  components: {},
  data () {
    return {
      Powerlist: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getPowerlist('list')
  },
  methods: {
    async getPowerlist (type) {
      const res = await getPowerlist(type)
      console.log(res)
      this.Powerlist = res
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
