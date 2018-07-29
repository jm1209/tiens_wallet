<template>
  <div class="sms" @click="getSms">
    <span>{{smsTxt}}</span>
  </div>
</template>

<script>
  import ajax from 'js/ajax';

  export default {
    name: "vSms",
    data() {
      return {
        time: 10,
        flag: true,
        timer: null,
      }
    },
    computed: {
      smsTxt() {
        return this.flag ? '获取验证码' : this.time + 's';
      }
    },
    methods: {
      getSms() {
        if (!this.flag) {
          return;
        }
        ajax('get/common/getCode', {codeType:3,memPhone:'16605625878'});
        this.flag = false;
        this.time = 10,
          this.timer = setInterval(() => {
            this.time--;
            if (this.time == 0) {
              this.flag = true;
              clearInterval(this.timer);
            }
          }, 1000);
      }
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/variable";

  .sms {
    width: 78px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: @font-theme-sm;
    border: 1px solid @cut-line;
    border-radius: 3px;
    color: @color-font-help;
  }
</style>
