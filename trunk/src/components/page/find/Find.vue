<template>
  <div class="find">
    <!--头部搜索栏和消息标识-->
    <div class="top">
      <div class="search-wrapper">
        <div class="search">
              <span class="text">
              <i class="icon"></i>
              大家正在搜：附近经济型酒店
            </span>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="info">
          <div class="num">99</div>
        </div>
      </div>
    </div>
    <!--tab栏-->
    <div class="tab">
      <router-link tag="div" to="/find/findAll" class="tab-item">
        <span class="tab-link">全部</span>
      </router-link>
      <router-link tag="div" to="/find/findActivity" class="tab-item">
        <span class="tab-link">热门活动</span>
      </router-link>
      <router-link tag="div" to="/find/findNews" class="tab-item">
        <span class="tab-link">新闻资讯</span>
      </router-link>
      <router-link tag="div" to="/find/findShop" class="tab-item">
        <span class="tab-link">附近店铺</span>
      </router-link>
    </div>
    <!--主体内容-->
    <transition name="slide">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

    <tab-bar tabIndex="2"></tab-bar>
  </div>
</template>

<script>
  import tabBar from 'base/tabBar';

  export default {
    name: "Find",
    components: {tabBar},
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .find {
    .top {
      display: flex;
      height: 48px;

      .search-wrapper {
        flex: 1;

        .search {
          width: 95%;
          margin: 7px auto 0;
          background-color: #F4F4F4;
          height: 34px;
          border-radius: 3px;
          text-align: center;
          line-height: 34px;

          .text {
            color: @color-font-help;
            font-size: @font-theme-xs;

            .icon {
              display: inline-block;
              width: 14px;
              height: 14px;
              .bg-img(main_search);
              background-size: 14px 14px;
              vertical-align: middle;
            }
          }
        }
      }
      .info-wrapper {
        flex: 0 0 30px;

        .info {
          width: 30px;
          height: 30px;
          .bg-img(main_not3);
          background-size: 30px 30px;
          margin: 10px 10px 0 0;
          position: relative;

          .num {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 16px;
            height: 16px;
            font-size: 10px;
            background-color: #FF2C2C;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 16px;
          }
        }
      }
    }
    .tab {
      display: flex;
      height: 44px;
      line-height: 44px;
      font-size: @font-theme-sm;
      color: #000;
      border-bottom: 1px solid #F2F2F2;

      .tab-item {
        flex: 1;
        text-align: center;

        &.active {
          color: @color-font-green;

          .tab-link {
            border-bottom: 2px solid @theme-color;
            padding-bottom: 5px;
          }
        }
      }
    }

    .slide-enter-active {
      transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .slide-leave {
      display: none;
    }
  }
</style>
