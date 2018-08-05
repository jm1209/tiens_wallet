<template>
  <div class="tip-box" v-if="tipShow">
    <div class="tip-bg"></div>
    <transition name="fade">
      <div class="tip-wrapper" v-show="fade">
        <div class="title">
          <i class="icon" @click="closeTip" v-if="closeShow"></i>
          <span class="txt">{{tipTitle}}</span>
        </div>
        <div class="tip-content" v-html="content"></div>
        <div class="tip-btn">
          <div class="one" @click="oneBtn" style="display: none">{{firstBtn}}</div>
          <div class="two">
            <div class="left" @click="leftBtn">{{firstBtn}}</div>
            <div class="right" @click="rightBtn">{{secondBtn}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "tipsBox",
    data() {
      return {
        fade:false
      }
    },
    props: {
      tipTitle: {type: String, default: '提示'},
      content: {type: String, default: ''},
      firstBtn: {type: String, default: '好的'},
      secondBtn: {type: String, default: '确定'},
      closeShow: {type: Boolean, default: false},
      tipShow: {type: Boolean, default: false},
    },
    methods: {
      oneBtn() {
        this.$emit('oneBtn');
      },
      closeTip() {
        this.$emit('closeTip');
      },
      leftBtn() {
        this.$emit('leftBtn');
      },
      rightBtn() {
        this.$emit('rightBtn');
      }
    },
    watch: {
      tipShow() {
        this.fade = false;
        setTimeout(() => {
          this.fade = true
        }, 100)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/variable";
  @import "../../assets/less/minix";

  .tip-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .tip-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .tip-wrapper {
      position: absolute;
      width: 256px;
      background-color: #fff;

      .title {
        height: 44px;
        position: relative;
        text-align: center;
        line-height: 44px;
        font-size: @font-title;
        color: #030303;
        border-bottom: 1px solid @theme-color;

        .icon {
          width: 21px;
          height: 21px;
          .bg-img(general_close);
          background-size: 21px 21px;
          .extend-click;
          top: 13px;
          left: 10px;
          position: absolute;
        }
      }
      .tip-content {
        align-items: center;
        padding: 20px 0 25px;
        width: 77%;
        line-height: 20px;
        text-align: center;
        margin: 0 auto;
      }
      .tip-btn {
        border-top: 1px solid #E1E1E1;
        height: 40px;

        .one {
          text-align: center;
          line-height: 40px;
          color: #030303;
          font-size: @font-theme;
        }
        .two {
          display: flex;
          box-sizing: border-box;
          line-height: 40px;
          text-align: center;

          .left {
            flex: 1;
            border-right: 1px solid #E1E1E1;
          }
          .right {
            flex: 1;
          }
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: all 0.3s;
    }
    .fade-enter, .fade-leave-to {
      transform: scale(0.1);
    }
  }
</style>
