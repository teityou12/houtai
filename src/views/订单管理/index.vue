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
          </el-row>
        </el-col>
        <el-col>
          <!-- 后插槽 -->
          <slot name="after" />
        </el-col>
      </el-row>
      <el-table border :data="oderslist">
        <el-table-column label="#" type="index" />
        <el-table-column label="订单编号" prop="order_number" />
        <el-table-column label="订单价格" prop="order_price" />
        <el-table-column label="是否付款" prop="order_pay">
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.order_pay === '0'"
              type="danger"
              label="未支付"
              effect="dark"
              >未支付</el-tag
            >
            <el-tag
              v-if="scope.row.order_pay === '1'"
              type="success"
              label="已支付"
              effect="dark"
              >未支付</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" />
        <el-table-column label="下单时间" prop="create_time">
          <template v-slot="{ row }">
            {{ (row.create_time * 1000) | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="showDialog"
          />
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改收货地址" :visible.sync="dialogVisible" width="60%">
      <span>
        <el-cascader
          :options="cityOptions"
          :value="city"
          change-on-select
          @change="changeProvince"
        />
      </span>
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
import { getOderslist } from '@/api/order'
import cityOptions from '@/js/city_data2017_element.js'
export default {
  filters: {},
  components: {},
  data () {
    return {
      cityOptions: cityOptions,

      dialogVisible: false,
      select: '',
      page: {
        query: '',
        pagenum: 1,
        pagesize: 9999,
        total: null
      },
      oderslist: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getOderslist()
  },
  methods: {
    async getOderslist () {
      const { goods } = await getOderslist(this.page)
      console.log(goods)
      this.oderslist = goods
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
    showDialog () {
      this.dialogVisible = true
    },
    changeProvince (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

