<template>
  <div class="wrap">
    <div class="banner">
      <img src="http://img-shop.kkkd.com/2019/activity/elem_banner.png" alt="">
    </div>
    <p class="tip">复制成功后请在 TB APP打开</p>
    <button @tap="copy">复制饿了么口令</button>
  </div>
</template>

<script>
  export default {
    name: 'elem',
    methods: {
      copy () {
        wx.setClipboardData({
          data: '$xnq81cInCbY$',
        })
      }
    }
  }
</script>


<style scoped lang="less">
  .wrap {
    height: 100vh;
    .banner {
      width: 750rpx;
      img {
        width: inherit;
        height: 696rpx;
      }
    }
    .tip {
      margin-top: 20rpx;
      text-align: center;
    }
    button {
      display: block;
      width: 600rpx;
      height: 84rpx;
      margin: 20rpx auto;
      color: #fff;
      font-size: 38rprx;
      border-radius: 42rpx;
      background: linear-gradient(90deg,#2b64ff,#4d94ff);
      box-shadow: 0.01rem 0.02rem 0.16rem 0 rgba(42,112,247,.58);
      border: none;
    }
  }
</style>
