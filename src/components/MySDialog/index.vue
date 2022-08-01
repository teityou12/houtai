<template>
  <div>
    <div class="Mydialog">
      <div class="dialog-cover" />
      <div class="mydialog-box" />
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
.Mydialog{
  .dialog-cover{
    position:fixed;
    left:0;
    right:0;
    top:0;
    width:100%;
    height:100vh;
    background-color:#0000;
    opacity: 0.3;
    z-index:1001;

  }
  .mydialog-box{
    border:1px red solid;
    width: 500px;
    height:300px;
  }

}
</style>
