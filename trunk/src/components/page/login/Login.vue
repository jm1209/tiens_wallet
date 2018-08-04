<template>
  <div class="login">
    <div class="close" @click="goIndex()"></div>
    <div class="logo"></div>
    <div class="btn-wrapper">
      <router-link tag="div" to="/codeLogin" class="code-login">验证码登陆</router-link>
      <router-link tag="div" to="/phoneLogin" class="phone-login">手机号登陆</router-link>
      <router-link tag="div" to="/register" class="register">手机号快捷注册</router-link>
    </div>
    <div class="login-other">
      <div class="title">
        <div class="line"></div>
        <div class="text">一键登陆</div>
        <div class="line"></div>
      </div>
      <div class="other-wrapper">
        <div class="wexi">
          <i class="icon wexi-icon"></i>
          微信
        </div>
        <div class="qq">
          <i class="icon qq-icon"></i>
          QQ
        </div>
        <div class="webo">
          <i class="icon webo-icon"></i>
          微博
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    methods: {
      goIndex() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/minix";
  @import "../../../assets/less/variable";

  .login {
    .close {
      width: 24px;
      height: 24px;
      .bg-img(login_close);
      background-size: 24px 24px;
      .extend-click;
      position: fixed;
      top: 10px;
      left: 10px;
    }
    .logo {
      width: 284px;
      height: 112.5px;
      .bg-img(login_logo);
      background-size: 284px 113px;
      margin: 96px auto 0;
    }
    .btn-wrapper {
      width: 345px;
      margin: 120px auto 0;

      .code-login {
        background-color: @theme-color;
        width: 100%;
        height: 50px;
        color: #fff;
        line-height: 50px;
        text-align: center;
        border-radius: 2px;
        font-size: @font-theme;
      }
      .phone-login {
        border: 1px solid @theme-color;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: @font-theme;
        margin-top: 15px;
      }
      .register {
        text-align: center;
        color: @color-font-black;
        font-size: @font-theme;
        margin-top: 15px;
        .extend-click;

        i {
          width: 13px;
          height: 12px;
          .bg-img(login_arrow);
          background-size: 13px 12px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .login-other {
      position: fixed;
      .pos-center;
      bottom: 0;
      width: 80%;

      .title {
        width: 100%;
        display: flex;
        text-align: center;

        .line {
          position: relative;
          top: -6px;
          border-bottom: 1px solid @color-font-prompt;
          flex: 1;
        }
        .text {
          padding: 0 12px;
          flex: 1;
          font-size: @font-theme-sm;
          color: @color-font-help;
        }
      }
      .other-wrapper {
        font-size: 0;
        text-align: center;
        margin: 15px 0 20px;

        .wexi {
          font-size: @font-theme-xs;
          line-height: 19px;
          color: @color-font-help;
          display: inline-block;
          .extend-click;

          .wexi-icon {
            display: inline-block;
            width: 23px;
            height: 19px;
            .bg-img(login_vxicon);
            background-size: 23px 19px;
            vertical-align: top;
          }
        }
        .qq {
          font-size: @font-theme-xs;
          line-height: 21px;
          color: @color-font-help;
          display: inline-block;
          margin: 0 21px 0 28px;
          .extend-click;

          .qq-icon {
            display: inline-block;
            width: 19px;
            height: 21px;
            .bg-img(login_qq);
            background-size: 19px 21px;
            vertical-align: top;
          }
        }
        .webo {
          font-size: @font-theme-xs;
          line-height: 19px;
          color: @color-font-help;
          display: inline-block;
          .extend-click;

          .webo-icon {
            display: inline-block;
            width: 23px;
            height: 19px;
            .bg-img(login_wbicon);
            background-size: 23px 19px;
            vertical-align: top;
          }
        }
      }
    }
  }
</style>
