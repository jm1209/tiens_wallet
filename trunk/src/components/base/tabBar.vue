<template>
  <div class="tab-bar">
    <router-link tag="div" to="" class="tab">
      <img src="../../assets/test/main_shouye1@2x.png">
      <p class="green">首页</p>
    </router-link>
    <router-link tag="div" to="" class="tab">
      <img src="../../assets/test/main_jifen2@2x.png">
      <p>积分商城</p>
    </router-link>
    <router-link tag="div" to="" class="tab">
      <img src="../../assets/test/main_faxian1@2x.png">
      <p>发现</p>
    </router-link>
    <router-link tag="div" to="" class="tab">
      <img src="../../assets/test/main_huiyuan1@2x.png">
      <p>会员中心</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "tabBar"
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/minix";
  @import "../../assets/less/variable";

  .help {
    height: 52px;
  }

  .tab-bar {
    position: fixed;
    bottom: 0;
    height: 49px;
    width: 100%;
    box-shadow: 0px 0px 2px 0px rgba(125, 125, 125, 0.5);
    display: flex;

    .tab {
      width: 25%;
      box-sizing: border-box;
      text-align: center;
      flex: 1;

      img {
        width: 30px;
        height: 30px;
      }
      p{
        color: #B0B0B0;
        font-size: 10px;

        &.green{
          color: @color-font-green !important;
        }
      };
    }
  }
</style>
