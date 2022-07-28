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
            <el-button type="primary">添加商品</el-button>
          </el-row>
        </el-col>
        <el-col>
          <!-- 后插槽 -->
          <slot name="after" />
        </el-col>
      </el-row>
      <el-table border :data="goodslist">
        <el-table-column label="#" type="index" />
        <el-table-column label="商品名称" prop="goods_name" />
        <el-table-column label="商品价格（元）" prop="goods_price" />
        <el-table-column label="商品重量" prop="goods_weight" />
        <el-table-column label="创建时间" prop="add_time">
          <template v-slot="{ row }">
            {{ (row.add_time * 1000) | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini" icon="el-icon-edit">_编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">_删除</el-button>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  filters: {},
  components: {},
  data () {
    return {
      select: '',
      page: {
        query: '',
        pagenum: 1,
        pagesize: 4,
        total: null
      },
      goodslist: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const { goods, total } = await getGoodsList(this.page)

      this.goodslist = goods
      console.log(goods)
      this.total = total
    },
    // newPage是最新的页码
    handleCurrentChange (newPage) {
      this.page.pagenum = newPage // 赋值最新的页码
      this.getGoodsList() // 重新拉取数据
    },
    handleSizeChange (Newpagesize) {
      this.page.pagesize = Newpagesize
      this.getGoodsList()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
