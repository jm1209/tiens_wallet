<template>
  <div class="find-all">
    <scroll class="content" ref="scroll" :data="shops" v-if="shops.length">
      <div>
        <div class="location">
          <i class="icon-loc"></i>
          <span class="address">{{location}}</span>
          <i class="icon-jt"></i>
          <i class="icon-reloc" @click="getLocation"></i>
        </div>
        <router-link tag="div" to="/find/findActivity" class="title">
          <span>热门活动</span>
          <i class="icon"></i>
        </router-link>
        <router-link tag="div" :to="{path:activity.actDetailUrl}" class="activity">
          <img :src="activity.actImageSmall" @load="loadImg">
        </router-link>
        <div class="activity-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="act in activityCategories">
              <img :src="act.actCategoryImage" @load="loadImg">
            </div>
          </div>
        </div>
        <router-link tag="div" to="/find/findNews" class="title">
          <span>新闻资讯</span>
          <i class="icon"></i>
        </router-link>
        <div class="news">
          <img :src="news.newsImageSmall" @load="loadImg">
          <div class="news-wrapper">
            <h2 class="news-title">{{news.newsTitle}}</h2>
            <p class="desc">{{news.newsDescription}}</p>
          </div>
        </div>
        <div class="news-list">
          <div class="list" v-for="newsItem in newsList">
            <div class="left">
              <h2 class="list-title">{{newsItem.newsTitle}}</h2>
              <p class="desc">{{newsItem.newsDescription}}</p>
              <p class="time">发布时间：{{newsItem.time}}</p>
            </div>
            <div class="right">
              <img :src="newsItem.newsImageSmall" @load="loadImg">
            </div>
          </div>
        </div>
        <router-link tag="div" to="/find/findShop" class="title">
          <span>附近店铺</span>
          <i class="icon"></i>
        </router-link>
        <div class="shops">
          <div class="shop" v-for="shop in shops">
            <div class="left">
              <img :src="shop.shopLogo" @load="loadImg">
            </div>
            <div class="center">
              <p class="name">{{shop.shopName}}</p>
              <p class="phone">{{shop.shopMobile}}</p>
              <p class="range">{{shop.shopDistance}}</p>
            </div>
            <div class="right">
              <i class="icon"></i>
              <span>点击查看</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="loading-wrapper" v-if="!shops.length">
      <v-loading></v-loading>
    </div>
  </div>
</template>

<script>
  import scroll from 'base/scroll';
  import vLoading from 'common/vLoading';
  import Swiper from 'swiper';
  import ajax from 'js/ajax';

  export default {
    name: "FindAll",
    components: {scroll, Swiper, vLoading},
    data() {
      return {
        location: '',
        activity: {},
        activityCategories: [],
        news: {},
        newsList: [],
        shops: []
      }
    },
    computed: {},
    methods: {
      loadImg() {
        if (!this.checkLoad) {
          this.$refs.scroll.refresh();
          this.checkLoad = true;
        }
      },
      getLocation() {
        this.location = '正在获取位置...';
        this._mapInit(() => {});
      },
      _mapInit(callback) {
        var geolocation = new BMap.Geolocation();
        var self = this;
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            self.longitude = r.point.lng;
            self.latitude = r.point.lat;
            let street = street ? '(' + street + ')' : '';
            self.location = r.address.city + r.address.district + street;
            callback();
          } else {
            alert('failed' + this.getStatus());
          }
        }, {enableHighAccuracy: true})
      },
      _findInit() {
        ajax('discovered/getAll', {memId: '', longitude: this.longitude, latitude: this.latitude}, (d) => {
          this.activity = d.data.activity;
          this.activityCategories = d.data.activityCategories;
          this.news = d.data.news;
          this.newsList = d.data.newsList;
          this.shops = d.data.shops;

          this.$nextTick(() => {
            this._swiperInit();
          });
        });
      },
      _swiperInit() {
        this.actSwiper = new Swiper('.activity-swiper', {
          slidesPerView: 'auto'
        });
      }
    },
    created() {
      this.actSwiper = null;
      this._mapInit(() => {
        this._findInit();
      });
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .find-all {
    .content {
      position: fixed;
      top: 95px;
      bottom: 50px;
      width: 100%;
      overflow: hidden;

      .location {
        padding: 15px 0;
        border-bottom: 1px solid #E1E1E1;
        font-size: 0;
        position: relative;

        .icon-loc {
          width: 11px;
          height: 15px;
          .bg-img(faxian_loc);
          background-size: 11px 15px;
          display: inline-block;
          margin: 0 7px 0 15px;
          vertical-align: top;
        }
        .address {
          font-size: @font-theme-sm;
          color: @color-font-black;
          line-height: 18px;
          display: inline-block;
          margin-right: 10px;
        }
        .icon-jt {
          display: inline-block;
          width: 10px;
          height: 15px;
          .bg-img(faxian_next);
          background-size: 10px 15px;
          vertical-align: top;
        }
        .icon-reloc {
          display: inline-block;
          width: 20px;
          height: 19px;
          .bg-img(faxian_reloc);
          background-size: 20px 19px;
          right: 15px;
          .extend-click();
          position: absolute;
        }
      }
      .title {
        padding: 16px 0 16px;
        text-align: center;

        span {
          color: #444444;
          font-size: @font-title;
        }
        .icon {
          width: 15px;
          height: 15px;
          .bg-img(main_more);
          background-size: 15px 15px;
          display: inline-block;
          vertical-align: top;
        }
      }
      .activity {
        width: 100%;

        img {
          width: 100%;
        }
      }
      .activity-swiper {
        margin-top: 20px;

        .swiper-slide {
          width: 95px;
          text-align: center;
          margin-right: 5px;

          &:first-child {
            margin-left: 10px;
          }

          img {
            width: 100%;
          }
        }
      }
      .news {
        width: 92%;
        margin: 0 auto;

        img {
          width: 100%;
        }
        .news-wrapper {
          border: 0.5px solid #D0D0D0;
          border-top-color: transparent;

          .news-title {
            text-align: left;
            .no-wrap();
            font-size: @font-theme;
            color: @color-font-black;
            margin: 7px 0 0 10px;
          }
          .desc {
            text-align: left;
            .no-wrap();
            font-size: 13px;
            color: @color-font-help;
            margin: 4px 0 7px 10px;
          }
        }
      }
      .news-list {
        width: 92%;
        margin: 0 auto;

        .list {
          display: flex;
          margin-top: 15px;
          border: 0.5px solid #D0D0D0;
          height: 125px;

          .left {
            flex: 1;
            overflow: hidden;

            .list-title {
              padding: 10px 10px 0 15px;
              .no-wrap();
              font-size: @font-theme;
              color: @color-font-black;
            }
            .desc {
              padding: 12px 10px 0 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 13px;
              color: @color-font-help;
              line-height: 20px;
              height: 39px;
            }
            .time {
              padding: 12px 10px 0 15px;
              font-size: 13px;
              color: @color-font-help;
            }
          }
          .right {
            flex: 0 0 125px;

            img {
              width: 100%;
            }
          }
        }
      }
      .shops {
        width: 92%;
        margin: 0 auto;

        .shop {
          display: flex;
          margin-bottom: 20px;
          align-items: center;

          .left {
            width: 100px;
            flex: 0 0 100px;

            img {
              width: 100px;
              height: 100px;
            }
          }
          .center {
            flex: 1;
            padding-left: 10px;

            .name {
              color: #555;
              font-size: 14px;
            }
            .phone {
              color: @color-font-black;
              font-size: 16px;
              margin: 12px 0 12px;
            }
            .range {
              color: #aaa;
              font-size: 13px;
            }
          }
          .right {
            flex: 0 0 102px;
            width: 102px;
            height: 26px;
            border-radius: 2px;
            background-color: @theme-color;
            color: #fff;
            font-size: 13px;
            line-height: 26px;
            text-align: center;

            .icon {
              width: 9px;
              height: 13px;
              .bg-img(faxian_loc1);
              background-size: 9px 13px;
              display: inline-block;
              vertical-align: middle;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .loading-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }
</style>
