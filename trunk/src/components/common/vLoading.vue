<template>
  <div class="loading">
    <img src="../../assets/images/loading.gif" width="65" height="65">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "vLoading",
    props: {
      title: {type: String, default: '小狮子正在奋力加载中...'}
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/variable";

  .loading {
    width: 100%;
    text-align: center;

    .desc {
      line-height: 20px;
      font-size: @font-theme-sm;
      color: @color-font-black;
    }
  }
</style>
