<template>
  <div class="top" :class="background">
    <div class="back" @click.stop="back"></div>
    <div class="text">{{title}}</div>
    <div class="btn" @click="unknown" v-if="btnName || btnBg" :class="btnBg">{{btnName}}</div>
  </div>
</template>

<script>
  export default {
    name: "vTop",
    props: {
      background: {type: String, default: 'white'},
      title: {type: String, default: ''},
      btnName: {type: String, default: ''},
      btnBg: {type: String, default: ''},
    },
    methods: {
      back() {
        this.$router.back()
      },
      unknown() {
        this.$emit('trigger');
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/variable";
  @import "../../assets/less/minix";

  .top {
    display: flex;
    height: 44px;
    justify-content: space-between;
    line-height: 44px;
    margin-bottom: 5px;
    box-shadow: 0px 1px 2px 0px rgba(125, 125, 125, 0.25);


    &.white {
      background-color: #fff;
    }
    &.green {
      background-color: @theme-color;
    }
    .back {
      width: 10px;
      height: 17px;
      .bg-img(general_return);
      background-size: 10px 17px;
      margin-top: 13px;
      margin-left: 11px;
      .extend-click;
    }
    .text {
      font-size: @font-title;
      color: @color-font-black;
      text-align: center;
      position: absolute;
      .pos-center;
    }
    .btn {
      font-size: @font-theme-sm;
      color: @color-font-black;
      margin-right: 11px;
    }
  }
</style>
