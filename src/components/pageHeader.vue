<template>
  <div>
    <div :class="{'page-header': true, isX: isX, android: isAndroid, anim_fade_image: isAnimate}" v-show="!isHideTitleBar">
      <div class="page-header-placeholder" :style="{height: headerPlaceholderHeight + 'px'}"></div>
      <div :class="{'page-header-wrap': true, isfixed: isFixed}" :style="{backgroundColor: backgroundColor, color: color, height: (headerPlaceholderHeight - statusBarHeight) + 'px', paddingTop: statusBarHeight + 'px'}">
        <div class="header-back" v-if="isBack && !isFirstPage" @tap="toBack">
          <image class="icon" src="http://img-shop.kkkd.com/FlALTL1lh-Oxxo4GkbSBzeBOU6nF"></image>
        </div>
        <div class="header-title">{{title}}</div>
      </div>
    </div>
    <div :class="{'page-header': true, isX: isX, android: isAndroid}" v-show="isHideTitleBar">
      <div :class="{'page-header-wrap': true, isfixed: isFixed}" :style="{background: 'transparent', paddingTop: statusBarHeight + 'px'}">
        <div class="header-backA" v-if="isBack && !isFirstPage" @tap="toBack">
          <image class="backA" src="http://img-shop.kkkd.com/FnmgfTsI2Vi9XepwZdqvMBVlB_Td"></image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { compareVersion } from '../utils';

  export default {
    props: {
      title: String,
      isBack: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: '#fff'
      },
      backgroundColor: {
        type: String,
        default: '#ef1612'
      },
      isAnimate: {
        type: Boolean,
        default: false
      },
      isFixed: {
        type: Boolean,
        default: true
      },
      isHideTitleBar: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isFirstPage: false,
        isShow: true
      }
    },
    computed: {
      ...mapState({
        isX: state => state.common.systemInfo.isX,
        isAndroid: state => state.common.systemInfo.isAndroid,
        statusBarHeight: state => state.common.systemInfo.statusBarHeight,
        headerPlaceholderHeight: state => {
          return state.common.systemInfo.statusBarHeight + 44
        }
      })
    },
    methods: {
      toBack () {
        wx.navigateBack({
          delta: 1
        });
      },
    },
    mounted () {
      const pages = getCurrentPages();
      this.isFirstPage = pages.length === 1;
    },
    onShow () {
      const pages = getCurrentPages();
      this.isFirstPage = pages.length === 1;
    }
  };
</script>

<style scoped lang="less">
  @import "../less/main";
.page-header {
  position: relative;
  z-index: 999;
  .page-header-placeholder {
    height: 64px;
  }
  .page-header-wrap {
    height: 44px;
    padding-top: 20px;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    &.isfixed {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 750rpx;
    }
    .header-back {
      position:absolute;
      left: 0;
      width:40px;
      height:40px;
      padding:0;
      margin:auto;
      color:inherit;
      background-color:transparent;
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:20rpx;
        height:36rpx;
        margin: auto;
      }
    }
    .header-backA {
      position:absolute;
      left: 0;
      height:40px;
      padding:0;
      margin:auto;
      .backA {
        position: absolute;
        top: 0;
        left: 20rpx;
        right: 0;
        bottom: 0;
        width:140rpx;
        height:60rpx;
        margin: auto;
      }
    }
    .header-title {
      flex: 1;
      text-align: center;
      padding: 0 40px;
      font-size: 34rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  /*&.isX {
    .page-header-placeholder {
      height: 88px;
    }
    .page-header-wrap {
      padding-top: 44px;
    }
  }
  &.android {
    .page-header-placeholder {
      height: 72px;
    }
    .page-header-wrap {
      height: 48px;
      padding-top: 24px;
    }
  }*/
}
</style>
