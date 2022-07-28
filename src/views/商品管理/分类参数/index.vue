<template>
  <div>
    <el-card>
      <el-alert type="warning" show-icon :closebel="false">
        注意：只允许为三级分类设置相关参数
      </el-alert>

      <div class="block">
        <span class="demonstration">选择商品分类：</span>

        <el-cascader
          v-model="selectedCateKeys"
          expand-trigger="hover"
          :options="catelist"
          :props="cateProps"
          @change="handleChange"
        />
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="small" :disabled="Btndisable">添加参数</el-button>
          <el-table border :data="attrNameList">
            <el-table-column label="#" type="index" />
            <el-table-column label="分类名称" prop="attr_name" />
            <el-table-column label="操作">
              <el-button type="primary" size="mini" icon="el-icon-edit">_编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="small" :disabled="Btndisable">添加属性</el-button>
          <el-table border :data="attrNameList">
            <el-table-column label="#" type="index" />
            <el-table-column label="分类名称" prop="attr_name" />
            <el-table-column label="操作">
              <el-button type="primary" size="mini" icon="el-icon-edit">_编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>

// import ActiveData from './components/ActiveData.vue'
import { getCategories, getCategoriesList } from '@/api/goods'

export default {
  filters: {},
  components: {},
  data () {
    return {

      id: this.Choosid,
      sel: this.activeName,

      activeName: 'many',
      value: [],
      // 商品分类列表
      catelist: [],
      // categorieslist: []
      // 级联选择框配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定数组
      selectedCateKeys: [],
      attrNameList: []
    }
  },
  computed: {
    Btndisable () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      } else {
        return false
      }
    },

    Choosid () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      } else {
        return null
      }
    }

  },

  watch: {},
  created () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const res = await getCategories()
      console.log(res)
      // this.options = JSON.stringify(res).replaceAll('cat_name', 'label')
      // JSON.parse(this.options)
      // console.log(JSON.parse(this.options))   数据丢失     NG
      this.catelist = res
    },

    async handleChange (id, sel) {
      console.log(this.selectedCateKeys)
      const res1 = await getCategoriesList(this.Choosid, this.activeName)
      console.log(res1)
      this.attrNameList = res1
    },

    // tab栏的点击函数
    handleClick () {
      console.log(this.activeName)
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
