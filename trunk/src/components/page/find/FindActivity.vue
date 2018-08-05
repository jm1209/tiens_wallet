<template>
  <div class="find-activity">
    <scroll class="content" ref="scroll" v-if="activityCategories.length>0" :data="activityList"
            :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="scrollToEnd">
      <div>
        <div class="activity-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="act in activityCategories">
              <img :src="act.actCategoryImage" @load="loadImg">
            </div>
          </div>
        </div>
        <div class="activity-list">
          <div class="list" v-for="act in activityList">
            <img :src="act.actImageSmall" width="100%">
            <p class="title">{{act.actTitle}}</p>
            <p class="time">{{act.actStartTime}}至{{act.actEndTime}}</p>
          </div>
        </div>
        <v-uploading :loadShow="loadShow"></v-uploading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'base/scroll';
  import vLoading from 'common/vLoading';
  import vUploading from 'common/vUploading';
  import Swiper from 'swiper';
  import ajax from 'js/ajax';

  export default {
    name: "FindActivity",
    components: {scroll, Swiper, vLoading, vUploading},
    data() {
      return {
        beforeScroll: true,
        pullup: true,
        activityCategories: [],
        activityList: [],
        hasMore: true,
        loadShow: true
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
        this._getActivityList();
      },
      _findActivityInit() {
        ajax('get/discovered/getActivityCategories', {}, (d) => {
          this.activityCategories = d.data;

          this.$nextTick(() => {
            this._swiperInit();
          });
        });
      },
      _getActivityList() {
        ajax('get/discovered/getActivityList', {memId: '', actCategoryId: '', page: this.page, pageSize: 5}, (d) => {
          this.activityList = this.activityList.concat(d.data);
          if (d.data.length < 5) {
            this.hasMore = false;
            this.loadShow = false
          }
        });
      },
      _swiperInit() {
        this.actSwiper = new Swiper('.activity-swiper', {
          slidesPerView: 'auto'
        });
      }
    },
    watch: {
      activityList() {
        this.$refs.scroll.refresh()
      }
    },
    created() {
      this.actSwiper = null;
      this.page = 1;
      this._findActivityInit();
      this._getActivityList();
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .find-activity {
    .content {
      position: fixed;
      top: 95px;
      bottom: 50px;
      width: 100%;
      overflow: hidden;

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
      .activity-list {
        width: 92%;
        margin: 10px auto 0;

        .list {
          margin-bottom: 16px;
          border: 0.5px solid #D0D0D0;
          border-radius: 2px;

          .title {
            font-size: @font-theme;
            color: @color-font-black;
            line-height: 23px;
            padding-left: 10px;
          }
          .time {
            color: @color-font-help;
            font-size: 13px;
            line-height: 18px;
            padding-left: 10px;
            margin-bottom: 7px;
          }
        }
      }
    }

  }
</style>
