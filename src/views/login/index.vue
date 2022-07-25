<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">开心客栈</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="Handlerlogin"
        />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span> -->
      </el-form-item>

      <el-button
        type="info"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="Handlerlogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        // 字段名都是和接口文档保持一致

        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
      // passwordType: 'password'

    }
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },

  methods: {
    ...mapActions(['user/login']),
    // showPwd () {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
    reset () {
      // 获取表单组件实现对象
      // 对整个表单进行重置为初始值并移除校验结果
      this.$refs.loginFormRef.resetFields()
    },

    async Handlerlogin () {
      // 二次校验

      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/login', this.loginForm)

        // todo 把token存到vuex中 并且持久化到 localStorage
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden; // 设置背景图片
  background-image: url("~@/assets/common/bg.png");
  background-position: center; // 将图片位置设置为充满整个屏幕

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
