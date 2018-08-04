<template>
  <div class="phone-login">
    <v-top title="手机号登陆" btn-name="注册" @trigger="register"></v-top>
    <div class="logo"></div>
    <div class="input-wrapper">
      <div class="phone-wrapper">
        <div class="phone"><input type="number" placeholder="请输入手机号" v-model="phone"></div>
      </div>
      <div class="pwd-wrapper">
        <div class="pwd"><input :type="typeState" placeholder="请输入密码" v-model="pwd"></div>
        <div class="pwd-btn" @click="checkType"></div>
      </div>
      <router-link tag="div" to="/codeLogin" class="other"><span>使用验证码登陆</span></router-link>
    </div>
    <div class="login" @click="login">登陆</div>
  </div>
</template>

<script>
  import vTop from 'common/vTop';

  export default {
    name: "Phone-login",
    components: {vTop},
    data() {
      return {
        showPwd: true,
        phone: '',
        pwd: '',
      }
    },
    computed: {
      typeState() {
        return this.showPwd ? 'password' : 'text';
      }
    },
    methods: {
      register() {
        this.$router.push({path:'/register'});
      },
      checkType() {
        if (this.pwd == '') {
          return;
        }
        this.showPwd = !this.showPwd;
      },
      login(){
        this.$router.push({path:'/index'});
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .phone-login {
    .logo {
      width: 284px;
      height: 112.5px;
      .bg-img(login_logo);
      background-size: 284px 113px;
      margin: 53px auto 0;
    }
    .input-wrapper {
      width: 90%;
      margin: 53px auto 0;

      .phone-wrapper {
        display: flex;
        .border-1px(@cut-line);
        padding-bottom: 12px;

        .area {
          flex: 0 0 55px;
          line-height: 20px;
          font-size: @font-theme-sm;

          i {
            width: 20px;
            height: 20px;
            .bg-img(login_quhao);
            background-size: 20px 20px;
            display: inline-block;
            vertical-align: top;
          }
        }
        .phone {
          flex: 1;

          input {
            width: 100%;
          }
        }
      }
      .pwd-wrapper {
        display: flex;
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        position: relative;
        .border-1px(@cut-line);
        padding-bottom: 12px;

        .pwd {
          input {
            height: 30px;
          }
        }
        .pwd-btn {
          position: absolute;
          right: 5px;
          margin-top: 5px;
          .bg-img(login_visible);
          background-size: 25px 25px;
          width: 25px;
          height: 25px;
        }
      }
      .other {
        text-align: right;

        span {
          display: inline-block;
          font-size: @font-theme;
          color: @color-font-green;
          margin: 10px 0 15px;
          .extend-click;
        }
      }
    }
    .login {
      width: 90%;
      margin: 0 auto;
      background-color: @theme-color;
      line-height: 50px;
      height: 50px;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      font-size: @font-theme;
    }
  }
</style>
