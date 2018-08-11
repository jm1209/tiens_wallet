<template>
  <div class="register">
    <v-top title="手机号注册"></v-top>
    <div class="input-wrapper">
      <div class="input-bg">
        <div class="phone-wrapper">
          <div class="area" @click="chooseArea">{{zone}}<i></i></div>
          <div class="phone"><input type="number" placeholder="请输入手机号" v-model="phone"></div>
        </div>
        <div class="invite-wrapper">
          <div class="code"><input type="number" placeholder="邀请码(选填)" v-model="inviteCode"></div>
        </div>
        <div class="sms-wrapper">
          <div class="sms"><input type="text" placeholder="短信验证码" v-model="smsCode"></div>
          <div class="sms-btn">
            <v-sms :phoneNum="phone" @openMsg="openMsg"></v-sms>
          </div>
        </div>
        <div class="pwd-wrapper">
          <div class="pwd"><input type="password" placeholder="请设置密码" v-model="pwd"></div>
        </div>
      </div>
    </div>
    <div class="next" @click="next">下一步</div>
    <div class="txt">
      用户注册代表同意
      <router-link tag="span" to="" class="clause">《服务条款》</router-link>
      和
      <router-link tag="span" to="" class="policy">《天狮隐私政策》</router-link>
    </div>
    <transition name="upmsg">
      <v-msg :msg="msg" :msgShow="msgShow"></v-msg>
    </transition>
    <v-ShadeLoading :isShade="isShade"></v-ShadeLoading>

  </div>
</template>

<script>
  import vTop from 'common/vTop';
  import vSms from 'common/vSms';
  import vMsg from 'common/vMsg';
  import vShadeLoading from 'common/vShadeLoading';
  import ajax from 'js/ajax';
  import {checkEmpty, checkPhone} from "js/check";
  import {mapGetters} from 'vuex';
  import myPicker from 'my-picker';
  import 'my-picker/docs/my-picker.css'

  export default {
    name: "Register",
    components: {vTop, vSms, vMsg, vShadeLoading},
    data() {
      return {
        phone: '',
        inviteCode: '',
        smsCode: '',
        pwd: '',
        msgShow: false,
        msg: '请输入手机号',
        isShade: false,
        zone: '+86'
      }
    },
    computed: {
      ...mapGetters(['areaCode'])
    },
    methods: {
      chooseArea() {
        var self = this;
        const areaNum = [];
        this.areaCode.forEach((item) => {
          areaNum.push(item.key)
        });
        this.myPicker = new myPicker({
          cols: [{
            options: areaNum
          }],
          onOkClick: function (values) {
            self.zone = values[0];
          },
        })
        this.myPicker.show();
      },
      next() {
        if (!checkEmpty(this.zone)) {
          this.msgShow = true;
          this.msg = '区号不能为空';
          return;
        }  if (!checkEmpty(this.phone)) {
          this.msgShow = true;
          this.msg = '手机号不能为空';
          return;
        }
        if (!checkPhone(this.phone)) {
          this.msgShow = true;
          this.msg = '手机格式不正确';
          return;
        }
        if (!checkEmpty(this.smsCode)) {
          this.msgShow = true;
          this.msg = '验证码不能为空';
          return;
        }
        if (!checkEmpty(this.pwd)) {
          this.msgShow = true;
          this.msg = '密码不能为空';
          return;
        }
        this.isShade = true;
        var data = {
          memPhone: this.phone,
          memRelatedInvitationCode: this.inviteCode,
          smsCode: this.smsCode,
          memPassword: this.pwd,
        };
        ajax('center/register', data, (d) => {
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
      },
    },
    mounted() {
      this.myPicker = null;
    },
  }
</script>

<style scoped lang="less">
  @import '../../../assets/less/variable';
  @import '../../../assets/less/minix';

  .register {
    background-color: #F2F2F2;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;

    .input-wrapper {
      padding-top: 15px;
      background-color: #fff;

      .input-bg {
        margin: 0 auto;
        width: 90%;

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
        .invite-wrapper {
          .border-1px(@cut-line);
          padding-bottom: 12px;
          margin-top: 15px;
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
        .pwd-wrapper {
          padding-bottom: 12px;
          margin-top: 15px;
        }
      }
    }
    .next {
      width: 90%;
      margin: 25px auto 0;
      background-color: @theme-color;
      line-height: 50px;
      height: 50px;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      font-size: @font-theme;
    }
    .txt {
      font-size: @font-theme-xs;
      color: @color-font-help;
      width: 90%;
      margin: 10px auto;

      .clause, .policy {
        color: @color-font-blue;
      }
    }
    .upmsg-enter-active, .upmsg-leave-active {
      transition: all 0.3s;
    }
    .upmsg-enter, .upmsg-leave-to {
      transform: translateY(0);
    }
  }
</style>
