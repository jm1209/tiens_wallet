<template>
  <div class="shade-loading" v-if="isShade">
    <div class="shade"></div>
    <div class="load-wrapper">
      <img src="../../assets/images/loading.gif" width="52">
      <p>正在加载...</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vShadeLoading",
    props: ['isShade']
  }
</script>

<style scoped lang="less">
  .shade-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    .shade {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .load-wrapper {
      position: absolute;
      width: 127px;
      height: 127px;
      background-color: #fff;
      text-align: center;
      border-radius: 8px;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      img {
        margin-top: 24px;
      }
    }
  }
</style>
