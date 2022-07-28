<template>
  <div>
    <el-card>
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>

      <!-- <el-button style="margin-top: 12px" @click="next">下一步</el-button> -->

      <div class="block">
        <!-- <div class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
        </div> -->

        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            :type="danger "
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      active: 0,

      activities: [{
        content: '基本信息'

      }, {
        content: '商品参数'

      }, {
        content: '商品属性'

      },
      {
        content: '商品图片'

      },
      {
        content: '商品内容'

      }
      ]

    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
