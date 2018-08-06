<template>
  <div class="code-login">
    <v-top title="验证码登陆" btn-name="注册" @trigger="register"></v-top>
    <div class="logo"></div>
    <div class="input-wrapper">
      <div class="phone-wrapper">
        <div class="area">+86 <i></i></div>
        <div class="phone"><input type="number" placeholder="请输入手机号" v-model="phoneNum"></div>
      </div>
      <div class="sms-wrapper">
        <div class="sms"><input type="text" placeholder="短信验证码" v-model="codeNum"></div>
        <div class="sms-btn">
          <v-sms :phoneNum="phoneNum" @openMsg="openMsg"></v-sms>
        </div>
      </div>
      <router-link tag="div" to="/phoneLogin" class="other"><span>使用手机账号登录</span></router-link>
    </div>
    <div class="login" @click="login">登陆</div>

    <transition name="upmsg">
      <v-msg :msg="msg" :msgShow="msgShow"></v-msg>
    </transition>
    <v-shadeLoading :isShade="isShade"></v-shadeLoading>
  </div>
</template>

<script>
  import vTop from 'common/vTop';
  import vSms from 'common/vSms';
  import vMsg from 'common/vMsg';
  import vShadeLoading from 'common/vShadeLoading';
  import ajax from 'js/ajax';

  export default {
    name: "Code-login",
    components: {vTop, vSms, vMsg, ajax, vShadeLoading},
    data() {
      return {
        phoneNum: '',
        codeNum: '',
        msg: '请输入手机号',
        msgShow: false,
        isShade: false
      }
    },
    methods: {
      register() {
        this.$router.push({path: '/register'});
      },
      login() {
        if (this.phoneNum == '') {
          this.msgShow = true;
          this.msg = '手机号不能为空';
          return;
        }
        if (this.codeNum == '') {
          this.msgShow = true;
          this.msg = '验证码不能为空';
          return
        }
        this.isShade = true;
        ajax('get/center/validatePhone', {memPhone: this.phoneNum, smsCode: this.codeNum}, (d) => {
          this.isShade = false;
          if (d.code == '0') {
            this.$router.push({path: '/index'});
          } else {
            this.msg = d.msg;
            this.msgShow = true;
            setTimeout(() => {
              this.msgShow = false;
            }, 2000)
          }

        });
      },
      openMsg() {
        this.msgShow = true;
        setTimeout(() => {
          this.msgShow = false;
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .code-login {
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
      .sms-wrapper {
        display: flex;
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        position: relative;
        .border-1px(@cut-line);
        padding-bottom: 12px;

        .sms {
          input {
            height: 30px;
          }
        }
        .sms-btn {
          position: absolute;
          right: 0;
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
