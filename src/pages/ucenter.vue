<template>
  <div class="wrap">
    <div class="tools">
      <h3 class="tools-hd">
        我的工具箱
      </h3>
      <div class="cell flex flex-wrap">
        <!--<div class="item flex flex-column justify-center items-center" @tap="linkTo('/pages/elem')">
          <img src="/static/images/ucenter/elem.png" alt="">
          <p class="text">饿了么红包</p>
        </div>-->
        <div class="item flex flex-column justify-center items-center" @tap="linkTo('/pages/festival')">
          <img src="/static/images/ucenter/festival.png" alt="">
          <p class="text">鼠年祝福</p>
        </div>
        <div class="item flex flex-column justify-center items-center" @tap="linkTo('/pages/target')">
          <img src="/static/images/ucenter/flag.png" alt="">
          <p class="text">新年Flag</p>
        </div>
        <!--<div class="item flex flex-column justify-center items-center" @tap="linkTo('/pages/daka')">
          <img src="/static/images/ucenter/daka.png" alt="">
          <p class="text">打卡</p>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { linkTo } from '../utils'

  export default {
    name: 'ucenter',
    methods: {
      linkTo (url) {
        linkTo(url);
      },
    }
  }
</script>


<style scoped lang="less">
  .wrap {
    min-height: 100vh;
    background: #f8f8f8;
    .tools {
      padding-top: 20rpx;
    }
    .tools-hd {
      line-height: 40rpx;
      font-size: 34rpx;
      font-weight: bold;
      padding: 15rpx;
      margin-bottom: 10rpx;
    }
    .cell {
      width: 720rpx;
      margin: 0 auto;
      background: #fff;
      .item {
        width: 360rpx;
        height: 180rpx;
        img {
          width: 60rpx;
          height: 60rpx;
          margin-bottom: 20rpx;
        }
        p {
          text-align: center;
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
</style>
