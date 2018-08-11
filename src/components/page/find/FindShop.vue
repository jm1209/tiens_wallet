<template>
  <div class="find-shop">
    <scroll class="content" ref="scroll" :data="shopsArr" v-if="shopsArr.length>0" :pullup="pullup"
            @scrollToEnd="scrollToEnd" :beforeScroll="beforeScroll">
      <div>
        <div class="location">
          <i class="icon-loc"></i>
          <span class="address">{{location}}</span>
          <i class="icon-jt"></i>
          <i class="icon-reloc" @click="getLocation"></i>
        </div>
        <div class="shops">
          <div class="shop" v-for="shop in shopsArr">
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
          <v-uploading :loadShow="loadShow"></v-uploading>
        </div>
      </div>
    </scroll>
    <div class="loading-wrapper" v-if="!shopsArr.length">
      <v-loading></v-loading>
    </div>
  </div>
</template>

<script>
  import scroll from 'base/scroll';
  import vLoading from 'common/vLoading';
  import vUploading from 'common/vUploading';
  import ajax from 'js/ajax';

  const PAGESIZE = 5;

  export default {
    name: "FindShop",
    components: {scroll, vLoading, vUploading},
    data() {
      return {
        beforeScroll: true,
        shopsArr: [],
        hasMore: true,
        loadShow: true,
        pullup: true,
        location: '',
        again: false
      }
    },
    methods: {
      loadImg() {
        if (!this.checkLoad) {
          this.$refs.scroll.refresh();
          this.checkLoad = true;
        }
      },
      scrollToEnd() {
        if (!this.hasMore) {
          return;
        }
        this.page++;
        this._shopsInit();
      },
      getLocation() {
        this.again = true;
        this.location = '正在获取位置...';
        this._mapInit(() => {
          this._shopsInit();
        });
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

      _shopsInit() {
        if (this.again) {
          this.page = 1;
        }
        let data = {
          longitude: this.longitude,
          latitude: this.latitude,
          page: this.page,
          pageSize: PAGESIZE
        };
        ajax('discovered/getShopList', data, (d) => {
          if (this.again) {
            this.shopsArr = d.data;
          } else {
            this.shopsArr = this.shopsArr.concat(d.data);
          }
          this.again = false;
          if (d.data.length < PAGESIZE) {
            this.hasMore = false;
            this.loadShow = false
          }
        })
      }
    },
    created() {
      this.page = 1;
      this._mapInit(() => {
        this._shopsInit();
      });
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .find-shop {
    .content {
      position: fixed;
      top: 95px;
      bottom: 50px;
      width: 100%;
      overflow: hidden;

      .location {
        padding: 15px 0;
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
