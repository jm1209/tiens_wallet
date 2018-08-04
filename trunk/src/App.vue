<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import ajax from 'js/ajax';
  import {mapMutations} from 'vuex';

  export default {
    name: 'App',
    methods: {
      _tabInit() {
        ajax('get/center/getConfig', {}, (d) => {
          this.setTabs(d.data.tabs);
        })
      },
      ...mapMutations({
        setTabs: 'SET_TABS'
      })
    },
    created() {
      this._tabInit();
    }
  }
</script>

<style scoped lang="less">
  #app {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
