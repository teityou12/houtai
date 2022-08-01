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
          <el-button
            type="primary"
            size="small"
            :disabled="Btndisable"
            @click="showDialog"
            >添加参数</el-button
          >

          <el-table border :data="attrNameList">
            <el-table-column label="#" type="index" />
            <el-table-column label="分类名称" prop="attr_name" />
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row)"
                  >_编辑</el-button
                >
                <el-button type="danger" size="mini" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="small" :disabled="Btndisable"
            >添加属性</el-button
          >
          <el-table border :data="attrNameList">
            <el-table-column label="#" type="index" />
            <el-table-column label="分类名称" prop="attr_name" />
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row)"
                  >_编辑</el-button
                >
                <el-button type="danger" size="mini" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogEVisible"
      width="50%"
      @close="reset"
    >
      <el-form
        ref="dialogEVisibleRef"
        label-width="80px"
        :model="dialogEVisibleForm"
        :rules="dialogEVisibleFormRules"
        :data="attrNameList"
      >
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="dialogEVisibleForm.attr_name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// import ActiveData from './components/ActiveData.vue'
import { getCategories, getCategoriesList, editCategoriesList, addCategoriesList } from '@/api/goods'

export default {

  filters: {},
  components: {},
  data () {
    return {
      input: '',
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
      attrNameList: [],
      dialogEVisible: false,
      dialogEVisibleForm: {
        id: null,
        attrId: this.attrId,
        attr_name: '',
        attr_sel: '',
        attr_vals: ''

      },
      dialogEVisibleFormRules: {
        attr_name: [{
          required: true, message: '请输入参数名', trigger: 'blur'
        }]

      }

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
    },

    title () {
      return this.dialogEVisibleForm.attrId ? '修改动态参数' : '添加动态参数'
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
    },

    async showEditDialog (row) {
      console.log(row)
      this.dialogEVisibleForm = { ...row }
      this.dialogEVisibleForm.id = row.cat_id
      this.dialogEVisibleForm.attrId = row.attr_id
      this.dialogEVisible = true
    },
    showDialog (id, attr_sel) {
      this.dialogEVisibleForm.id = this.Choosid
      this.dialogEVisibleForm.attr_sel = this.activeName
      this.dialogEVisible = true
    },
    async save (id) {
      // console.log(this.id)

      if (this.dialogEVisibleForm.attrId) {
        await editCategoriesList(this.dialogEVisibleForm)
        this.handleChange()
      } else {
        await addCategoriesList(this.dialogEVisibleForm)
        this.handleChange()
      }

      this.dialogEVisible = false
    },
    reset () {
      this.$refs.dialogEVisibleRef.resetFields()
      this.dialogEVisibleForm = {
        id: null,
        attrId: null,
        attr_name: '',
        attr_sel: '',
        attr_vals: ''

      }
    }

  }

}
</script>

<style scoped lang='scss'>
</style>
