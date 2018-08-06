<template>
  <div class="msg" v-if="msgShow">
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default {
    name: "vMsg",
    props: ['msg', 'msgShow']
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/variable";

  .msg {
    position: absolute;
    bottom: 0;
    transform: translate3d(0,-50px,0);
    height: 35px;
    color: #fff;
    text-align: center;
    line-height: 35px;
    font-size: @font-theme-xs;
    width: 100%;

    span{
      display: inline-block;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 0 23px;
      border-radius: 3px;
    }
  }
</style>
