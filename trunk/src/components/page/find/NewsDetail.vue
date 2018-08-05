<template>
  <div class="news-detail">
    新闻详情{{newsCategoryId}}
  </div>
</template>

<script>
  export default {
    name: "NewsDetail",
    created() {
      this.newsCategoryId = this.$route.path;
    }
  }
</script>

<style scoped>

</style>
