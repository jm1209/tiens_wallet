<template>
  <div class="find-news">
    <div class="news-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="column in newsClassify" @click="goNewsColumn(column,$event)">
          <span :class="newsCategoryId == column.newsCategoryId?'active':''">{{column.newsCategoryName}}</span>
        </div>
      </div>
    </div>

    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import ajax from 'js/ajax';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "FindNews",
    components: {Swiper, ajax},
    data() {
      return {
        newsClassify: []
      }
    },
    computed: {
      ...mapGetters(['newsCategoryId'])
    },
    methods: {
      goNewsColumn(column, e) {
        this.getNewsCategoryId({
          newsCategoryId: column.newsCategoryId
        });
        this.$router.push({path: '/find/findNews/' + column.newsCategoryId});
      },
      _findNewsInit() {
        if (this.newsCategoryId == '') {
          this.$router.push({path:'/find/findNews/'+'detail'})
        }
        ajax('discovered/getNewsCategories', {}, (d) => {
          this.newsClassify = d.data;

          this.$nextTick(() => {
            this._swiperInit();
          });
        });
      },
      _swiperInit() {
        this.newsSwiper = new Swiper('.news-swiper', {
          slidesPerView: 'auto'
        });
      },
      ...mapActions(['getNewsCategoryId'])
    },

    created() {
      this.newsSwiper = null;
      this._findNewsInit();
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variable";
  @import "../../../assets/less/minix";

  .find-news {
    .news-swiper {
      margin-top: 20px;

      .swiper-slide {
        margin-right: 15px;
        height: 25px;
        line-height: 25px;
        width: 88px;
        text-align: center;
        border: 1px solid @color-font-black;
        font-size: 13px;

        .active {
          background-color: @color-font-black;
          color: #fff;
        }

        span {
          display: block;
        }
        &:first-child {
          margin-left: 10px;
        }
        &:last-child {
          margin-left: 0;
        }
      }
    }
  }
</style>
