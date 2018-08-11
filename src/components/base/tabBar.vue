<template>
  <div class="tab-bar">
    <div class="tab" v-for="(tab,index) in trimTabs" @click="tabLink(index)">
      <img :src="tabSrc(tab,index)">
      <p :class="tabClass(index)">{{tab.name}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  const TOKEN = sessionStorage.getItem('token');

  export default {
    name: "tabBar",
    props: ['tabIndex'],
    computed: {
      trimTabs() {
        let tabName = ['首页', '积分商城', '发现', '会员中心'];
        for (var i = 0; i < this.tabs.length; i++) {
          this.tabs[i].name = tabName[i];
        }
        return this.tabs;
      },
      ...mapGetters(['tabs'])
    },
    methods: {
      tabClass(index) {
        return this.tabIndex == index ? 'green' : ''
      },
      tabSrc(tab, index) {
        return this.tabIndex == index ? tab.selectIcon : tab.normalIcon
      },
      tabLink(index) {
        if (index == 0) {
          this.$router.push({path: '/index'});
        } else if (index == 2) {
          this.$router.push({path: '/find/findAll'});
        } else if (index == 3) {
          if (TOKEN) {
            this.$router.push({path: '/vip/personal'});
          } else {
            this.$emit('isLogin');
          }
        }
      }
    }
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
    background-color: #fff;

    .tab {
      width: 25%;
      box-sizing: border-box;
      text-align: center;
      flex: 1;

      img {
        width: 30px;
        height: 30px;
      }
      p {
        color: #B0B0B0;
        font-size: 10px;

        &.green {
          color: @color-font-green !important;
        }
      }
    ;
    }
  }
</style>
