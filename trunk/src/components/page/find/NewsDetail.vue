<template>
  <div class="news-detail">
    新闻详情{{newsCategoryId}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ajax from 'js/ajax';

  const PAGESIZE = 5;

  export default {
    name: "NewsDetail",
    computed: {
      ...mapGetters(['newsCategoryId'])
    },
    methods: {
      _detailInit() {
        let newsCategoryId = this.newsCategoryId == 'detail' ? '' : this.newsCategoryId;
        let data = {memId: '', newsCategoryId: newsCategoryId, page: this.page, pageSize: PAGESIZE};
        ajax('discovered/getNewsList', data, (d) => {
          this.newsList = d.data;

        });
      }
    },
    watch: {
      newsCategoryId() {
        this._detailInit();
      }
    },
    created() {
      this.page = 1;
      this._detailInit();
    }
  }
</script>

<style scoped>

</style>
