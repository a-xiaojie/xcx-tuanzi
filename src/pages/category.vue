<template>
  <div class="container">
<!--    <pageHeader :title="title" backgroundColor="transparent"></pageHeader>-->
    <div class="search-box-wrap">
      <div class="search-help flex items-center justify-center" @tap="linkTo('/pages/search-help')">
        <i class="iconfont icon-help"></i>教程
      </div>
      <div class="search-box">
        <view class="search flex items-center justify-center" @tap="toSearch('')">
          <i class="iconfont icon-sousuo-"></i>
          <text>请输入商品名称</text>
        </view>
        <view class="search-key flex justify-between">
          <div @tap="toSearch('全部商品')">全部商品</div>
          <div v-for="(item, index) in keyWords" :key="index" @tap="toSearch(item)">{{item}}</div>
        </view>
      </div>
    </div>
  </div>
</template>

<script>
  // import pageHeader from '../components/pageHeader';
  import { CAT_IMG_HOST} from '../constants';
  import { linkTo} from '../utils';
  import * as service from '../services/product';

  export default {
    name: "category",
    data () {
      return {
        title: '搜券',
        keyWords: [],
        selectedId: 2
      }
    },
    components: {
      // pageHeader
    },
    methods: {
      toSearch (keyword = '') {
        let url = '/pages/search';
        if (keyword) {
          url += `?keyword=${keyword}`
        }
        wx.navigateTo({
          url
        });
      },
      async getHot () {
        const res = await service.getHot(3);
        if (res.status === 1) {
          this.keyWords = res.data.words;
        }
      },
      linkTo (url) {
        linkTo(url);
      }
    },
    onUnload () {
      this.keyWords = [];
      this.selectedId = 2;
    },
    mounted () {
      this.getHot();
    }
  };
</script>

<style scoped lang="less">
.container {
  min-height: 100vh;
  background: #f98a59 url("http://img-cows.kkkd.com/FlLhLbjd_mz8jQxdb3HPB3dHsRbq") no-repeat;
  background-size: 100%;
  .search-box-wrap {
    width:100%;
    height:600rpx;
    position:relative;
    z-index:3;
    .search-box {
      position:relative;
      top:350rpx;
      z-index:2;
      line-height:100rpx;
      .search {
        position:relative;
        width:700rpx;
        margin: 0 auto;
        height:80rpx;
        line-height:80rpx;
        background:#fff;
        border-radius:4rpx;
        font-size: 28rpx;
        color: #999;
        .iconfont {
          font-size: 30rpx;
          margin-right: 10rpx;
        }
      }
      .search-key {
        width: 700rpx;
        margin: 40rpx auto 0;
        > div {
          width:162rpx;
          height:60rpx;
          line-height:60rpx;
          font-size:24rpx;
          color:#fff;
          text-align:center;
          background:rgba(255,255,255,0.15);
          border-radius:4rpx;
          overflow:hidden;
        }
      }
    }
    .search-help {
      width:130rpx;
      height:60rpx;
      line-height:60rpx;
      background:rgba(128,14,6,0.4);
      border-top-left-radius:100rpx;
      border-bottom-left-radius:100rpx;
      font-size:24rpx;
      color:#fff;
      position:absolute;
      right:0;
      top:40rpx;
      .iconfont {
        margin-right: 10rpx;
      }
    }
  }
  .category-box {
    position: relative;
    top: 0;
    left: 0;
    width: 750rpx;
    z-index: 2;
    background: #fff;
    height: calc(100vh - 404rpx);
    .categories {
      position:absolute;
      left:0;
      top:0;
      width:200rpx;
      height:100%;
      font-size:28rpx;
      color:#333;
      text-align:center;
      background:#fff;
      overflow-y:auto;
      -webkit-overflow-scrolling:touch;
      .category-item {
        height:100rpx;
        line-height:100rpx;
        position:relative;
        &.selected {
          background:#f2f2f2;
          &:after {
            content: '';
            position:absolute;
            left:0;
            top: 50%;
            width:6rpx;
            height:60rpx;
            margin-top: -30rpx;
            display:inline-block;
            border-top-right-radius:1000rpx;
            border-bottom-right-radius:1000rpx;
            background:#ef1612;
          }
        }
      }
    }
    .details {
      position:absolute;
      right:0;
      top:0;
      width: 550rpx;
      height:100%;
      background: #fff;
      overflow:hidden;
      overflow-y:auto;
      -webkit-overflow-scrolling:touch;
      .detail-item {
        width: 33.33%;
        height: 230rpx;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        image {
          width: 146rpx;
          height: 146rpx;
          margin: auto;
        }
        text {
          display: block;
          margin: 0 10rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
