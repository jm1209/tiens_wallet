<template>
  <div class="index">
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
    <!--五种操作-->
    <div class="handle">
      <div class="item">
        <div class="scan-icon"></div>
        <div class="txt">扫一扫</div>
      </div>
      <div class="item">
        <div class="pay-icon"></div>
        <div class="txt">付款</div>
      </div>
      <div class="item">
        <div class="take-icon"></div>
        <div class="txt">收款</div>
      </div>
      <div class="item">
        <div class="recharge-icon"></div>
        <div class="txt">充值</div>
      </div>
    </div>
    <div class="loading" v-if="isLoad">
      <div class="load-wrapper">
        <img src="../../assets/images/loading.gif" width="50" height="50">
        <p>小狮子正在奋力加载中</p>
      </div>
    </div>
    <scroll class="content" ref="scroll" :listenScroll="listenScroll" :pulldown="pulldown" @pullLoad="loading"
            @scrollRang="scroll">
      <div>
        <!--banner轮播-->
        <div class="banner-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="ad in advertisements" :data-swiper-autoplay="ad.advTime*1000">
              <img :src="ad.advImage">
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <!--业态轮播-->
        <div class="business-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="busin in businesses">
              <div class="icon"><img :src="busin.busLogo" width="44"></div>
              <div class="txt">{{busin.busName}}</div>
            </div>
          </div>
        </div>
        <!--广告位-->
        <div class="adsense">
          <img :src="advertisement.advImage">
        </div>
        <!--热门活动-->
        <div class="activity">
          <div class="title">热门活动 <i class="icon"></i></div>
          <div class="activity-wrapper">
            <div class="item" v-for="act in activities">
              <img :src="act.actImageSmall">
              <div class="name">{{act.actTitle}}</div>
            </div>
          </div>
        </div>
        <!--猜你喜欢-->
        <div class="like" v-if="products.length>0">
          <div class="title">猜你喜欢 <i class="icon"></i></div>
          <div class="like-wrapper">
            <div class="item" v-for="prod in products">
              <img :src="prod.goodsImage">
              <h2 class="name">{{prod.goodsTitle}}</h2>
              <p class="price">￥{{prod.goodsPrice}}</p>
            </div>
          </div>
        </div>
        <div class="no-more">没有内容了</div>
      </div>
    </scroll>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import scroll from 'base/scroll';
  import tabBar from 'base/tabBar';
  import Swiper from 'swiper';
  import ajax from 'js/ajax';

  export default {
    name: "Index",
    data() {
      return {
        scrollY: 0,
        isLoad: false,
        activities: [],
        advertisements: [],
        businesses: [],
        products: [],
        advertisement:{}
      }
    },
    components: {scroll, tabBar},
    computed: {},
    methods: {
      scroll(pos) {
        this.scrollY = pos.y;
      },
      loading() {
        this.isLoad = false;
      },
      _swiperInit() {
        this.bannerSwiper = new Swiper('.banner-swiper', {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
        });
        this.businessSwiper = new Swiper('.business-swiper', {
          slidesPerView: 'auto'
        });
      },
      _indexInit() {
        ajax('get/index/getInfo', {memId: ''}, (d) => {
          this.activities = d.data.activities;
          this.advertisements = d.data.advertisements;
          this.businesses = d.data.businesses;
          this.activities = d.data.activities;
          this.products = d.data.products;
          this.advertisement = d.data.advertisement;

          this.$nextTick(() => {
            this._swiperInit();
          });
        })
      }
    },
    watch: {
      scrollY(newY) {
        if (newY > 30) {
          this.isLoad = true;
        }
      }
    },
    created() {
      this.bannerSwiper = null;
      this.businessSwiper = null;
      this.probeType = 3;
      this.listenScroll = true;
      this.pulldown = true;
      this._indexInit();
    },
    mounted() {
      this._swiperInit();
    }

  }
</script>

<style lang="less">
  @import "../../assets/less/variable";
  @import "../../assets/less/minix";

  .index {
    height: 100%;

    .top {
      display: flex;
      height: 48px;
      background-color: @theme-color;

      .search-wrapper {
        flex: 1;

        .search {
          width: 95%;
          margin: 7px auto 0;
          background-color: #fff;
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
          .bg-img(main_not2);
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
    .handle {
      width: 95%;
      margin: 12px auto;
      display: flex;

      .item {
        flex: 1;
        text-align: center;

        .scan-icon {
          display: inline-block;
          width: 35px;
          height: 35px;
          background-size: 35px 35px;
          .bg-img(main_sys);
        }
        .pay-icon {
          display: inline-block;
          width: 35px;
          height: 35px;
          background-size: 35px 35px;
          .bg-img(main_fk);
        }
        .take-icon {
          display: inline-block;
          width: 35px;
          height: 35px;
          background-size: 35px 35px;
          .bg-img(main_sk);
        }
        .recharge-icon {
          display: inline-block;
          width: 35px;
          height: 35px;
          background-size: 35px 35px;
          .bg-img(main_cz);
        }
        .txt {
          color: @color-font-help;
          margin-top: 5px;
        }
      }
    }
    .loading {
      text-align: center;
    }
    .content {
      overflow: hidden;
      position: fixed;
      top: 130px;
      bottom: 50px;
      width: 100%;

      .banner-swiper {
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }
        .swiper-pagination {
          text-align: right;

          .swiper-pagination-bullet-active {
            background-color: @theme-color !important;
          }

          .swiper-pagination-bullet {
            background-color: #fff;
            opacity: 1;

            &:last-child {
              margin-right: 20px;
            }
          }

        }
      }
      .business-swiper {
        margin-top: 20px;

        .swiper-slide {
          width: 22%;
          text-align: center;

          .txt {
            color: @color-font-black;
            font-size: @font-theme-sm;
            margin-top: 10px;
          }
        }
      }
      .adsense {
        width: 95%;
        margin: 20px auto 14px;

        img {
          width: 100%;
        }
      }
      .activity {
        border-top: 10px solid #f2f2f2;

        .title {
          margin: 19px 0;
          text-align: center;
          color: #444444;
          font-size: @font-title;

          .icon {
            display: inline-block;
            width: 15px;
            height: 15px;
            .bg-img(main_more);
            background-size: 15px 15px;
            vertical-align: middle;
          }
        }
        .activity-wrapper {
          width: 95%;
          margin: 0 auto;

          .item {
            width: 47%;
            margin: 0 1% 10px;
            display: inline-block;
            box-sizing: border-box;
            position: relative;

            img {
              width: 100%;
            }
            .name {
              position: absolute;
              width: 130px;
              height: 30px;
              left: 50%;
              transform: translateX(-50%);
              bottom: 5px;
              background: #fff;
              text-align: center;
              line-height: 30px;
              color: @color-font-black;
              border-radius: 2px;
            }
          }
        }
      }
      .like {
        border-top: 10px solid #f2f2f2;

        .title {
          margin: 19px 0;
          text-align: center;
          color: #444444;
          font-size: @font-title;

          .icon {
            display: inline-block;
            width: 15px;
            height: 15px;
            .bg-img(main_more);
            background-size: 15px 15px;
            vertical-align: middle;
          }
        }
        .like-wrapper {
          width: 95%;
          margin: 0 auto;

          .item {
            width: 47%;
            margin: 0 1% 10px;
            display: inline-block;
            box-sizing: border-box;

            img {
              width: 100%;
            }
            .name {
              color: @color-font-black;
              font-size: @font-theme;
              line-height: 20px;
            }
            .price {
              color: #B00000;
              font-size: @font-theme;
              line-height: 20px;
            }
          }
        }
      }
      .no-more {
        height: 50px;
        line-height: 50px;
        background-color: #F2F2F2;
        color: #b1b1b1;
        font-size: @font-theme-xs;
        text-align: center;
      }
    }
  }
</style>
