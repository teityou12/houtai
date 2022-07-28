<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddGoods">添加分类</el-button>
        </el-col>
      </el-row>

      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <template slot="isOk" slot-scope="scope">
          <i
            v-if="scope.row.cat_deleted === false"
            class="el-icon-success"
            style="color: green"
          />
          <i v-else class="el-icon-error" style="color: red" />
        </template>
      </tree-table>
    </el-card>
    <el-pagination
      :current-page="page.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <el-dialog title="添加商品分类" :visible.sync="addGoogsVisible" width="50%">
      分类名称：
      <el-input v-model="input" style="width=70%" />
      父级分类：
      <el-input v-model="input" width="80px" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategories } from '@/api/goods'
export default {
  filters: {},
  components: {},
  data () {
    return {
      input: '',
      addGoogsVisible: false,
      page: {
        query: '',
        pagenum: 1,
        pagesize: 4,
        total: null
      },
      cateList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isOk'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const res = await getCategories()
      console.log(res)
      this.cateList = res
    },
    // newPage是最新的页码
    handleCurrentChange (newPage) {
      this.page.pagenum = newPage // 赋值最新的页码
      this.getGoodsList() // 重新拉取数据
    },
    handleSizeChange (Newpagesize) {
      this.page.pagesize = Newpagesize
      this.getGoodsList()
    },

    showAddGoods () {
      this.addGoogsVisible = true
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
