<template>
  <div>
    <el-card>
      <el-alert title="添加商品信息" type="info" show-icon />
      <el-steps :active="value" finish-status="success">
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
      </el-radio-group>
      <el-tabs :tab-position="tabPosition" style="height: 100vh" :value="name">
        <el-tab-pane name label="基本信息">
          <el-form>
            <el-form-item label="商品名称">
              <el-input />
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input />
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input />
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input />
            </el-form-item>
            <el-form-item label="商品分类">
              <el-input />
            </el-form-item>
          </el-form>
          <div class="block">
            <span class="demonstration">商品分类：</span>

            <el-cascader
              v-model="selectedCateKeys"
              expand-trigger="hover"
              :options="catelist"
              :props="cateProps"
              @change="handleChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane name label="商品参数">配置管理</el-tab-pane>
        <el-tab-pane name label="商品属性">
          <el-form>
            <el-form-item label="端口-模拟RF接口">
              <el-input />
            </el-form-item>
            <el-form-item label="音频-扬声器数量">
              <el-input />
            </el-form-item>
            <el-form-item label="交互设备-无线键鼠">
              <el-input />
            </el-form-item>
            <el-form-item label="互联互通-多屏互动">
              <el-input />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name label="商品图片">
          <ImageUpload />
        </el-tab-pane>
        <el-tab-pane name label="商品内容">
          <!-- 富文本编辑器 -->
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            style="height: 350px"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
          />
          <el-row style="margin-top: 70px">
            <el-button type="primary" @click="addgood">添加商品</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  filters: {},
  components: { ImageUpload, quillEditor },
  data () {
    return {

      active: 1,
      tabPosition: 'left',
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: ['songti'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['image', 'video'] // 链接、图片、视频
          ]
        },
        theme: 'snow',
        placeholder: '请输入正文'
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    // 失去焦点事件
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    // 获得焦点事件
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    // 准备富文本编辑器
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    // 内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log(html)
      this.goodsinfo.goods_introduce = html
    }

  }
}
</script>

<style scoped lang='scss'>
.el-steps {
  padding: 0 80px;
}
.el-radio-group {
  display: none;
}
</style>
