<template>
  <div class="uploading" v-if="loadShow">
    <div class="loading">
      <img src="../../assets/images/loading-2.gif" width="20">
      <span>正在加载中</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vUploading",
    props: {
      loadShow: {type: Boolean, default: false}
    }
  }
</script>

<style scoped lang="less">
  .uploading {
    .loading {
      text-align: center;
      margin: 10px 0;

      img {
        vertical-align: top;
      }
      span {
        line-height: 20px;
      }
    }
  }
</style>
