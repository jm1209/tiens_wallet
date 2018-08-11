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
        <div class="pwd-btn" :class="btnShow" @click="checkType"></div>
      </div>
      <router-link tag="div" to="/codeLogin" class="other"><span>使用验证码登陆</span></router-link>
    </div>
    <div class="login" @click="login">登陆</div>
    <transition name="upmsg">
      <v-msg :msg="msg" :msgShow="msgShow"></v-msg>
    </transition>
    <v-ShadeLoading :isShade="isShade"></v-ShadeLoading>
  </div>
</template>

<script>
  import vTop from 'common/vTop';
  import vMsg from 'common/vMsg';
  import vShadeLoading from 'common/vShadeLoading';
  import ajax from 'js/ajax';

  export default {
    name: "Phone-login",
    components: {vTop, vMsg, vShadeLoading},
    data() {
      return {
        showPwd: true,
        phone: '',
        pwd: '',
        msg: '',
        msgShow: false,
        isShade: false
      }
    },
    computed: {
      typeState() {
        return this.showPwd ? 'password' : 'text';
      },
      btnShow() {
        return this.showPwd ? 'pwd-hide' : 'pwd-show';
      }
    },
    methods: {
      register() {
        this.$router.push({path: '/register'});
      },
      checkType() {
        if (this.pwd == '') {
          return;
        }
        this.showPwd = !this.showPwd;
      },
      login() {
        setTimeout(() => {
          this.msgShow = false;
        }, 2000);
        if (this.phone == '') {
          this.msgShow = true;
          this.msg = '请输入手机号';
          return;
        }
        if (this.pwd == '') {
          this.msgShow = true;
          this.msg = '请输入密码';
          return;
        }
        this.isShade = true;
        ajax('center/loginByPassword', {memPhone: this.phone, memPassword: this.pwd}, (d) => {
          this.isShade = false;
          if (d.code == '0') {
            this.isShade = false;
            this.$router.push({path: '/index'});
          } else if (d.code == '30003') {
            this.msgShow = true;
            this.msg = d.msg;
          }
        });
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
          background-size: 25px 25px;
          width: 25px;
          height: 25px;

          &.pwd-show {
            .bg-img(login_visible);
          }
          &.pwd-hide {
            .bg-img(login_invisible);
          }
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
    .upmsg-enter-active, .upmsg-leave-active {
      transition: all 0.3s;
    }
    .upmsg-enter, .upmsg-leave-to {
      transform: translateY(0);
    }
  }
</style>
