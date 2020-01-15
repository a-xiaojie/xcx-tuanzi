<template>
  <div class="wrap">
    <img src="/static/images/festival/bg.png" class="bg">
    <button @tap="linkTo('/pages/festivalDraw')" v-if="userInfo">去送祝福>></button>
    <button open-type="getUserInfo" v-else @getuserinfo="getUserInfo">去送祝福>></button>
  </div>
</template>

<script>
  import { linkTo } from '../utils'

  export default {
    name: 'festival',
    data () {
      return {
        userInfo: null
      }
    },
    methods: {
      linkTo (url) {
        linkTo(url);
      },
      getUserInfo (e) {
        console.log(e)
        linkTo('/pages/festivalDraw')
      }
    }
  }
</script>


<style lang="less">
  .wrap {
    position: relative;
    height: 100vh;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 750rpx;
      height: 100vh;
    }
    button {
      position: absolute;
      bottom: 120rpx;
      left: 0;
      right: 0;
      width: 600rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      font-size: 36rpx;
      background-color: #e6b030;
      border-radius: 40rpx;
    }
  }
</style>
