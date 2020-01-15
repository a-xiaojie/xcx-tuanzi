<template>
  <div class="wrap">
    <h3>
      选择你的Flag
      <span>(最多选5个哦)</span>
    </h3>
    <div class="list-wrap">
      <ol>
        <checkbox-group @change="checkboxChange">
          <li v-for="(item, index) in flags" :key="index">
            <label class="checkbox flex items-center">
              <checkbox :value="item.name"/>
              <span>{{item.name}}</span>
            </label>
          </li>
        </checkbox-group>
      </ol>
    </div>
    <div class="extra-wrap flex items-center justify-center">
      <input class="ipt" type="text" placeholder="没有我想选的，写一个吧" v-model="flag" maxlength="12">
      <button class="flag-btn" @tap="addFlag">立Flag</button>
    </div>
    <button class="next-btn" @tap="goNext" v-if="userInfo">下一步</button>
    <button class="next-btn" open-type="getUserInfo" v-else @getuserinfo="getUserInfo">下一步</button>
  </div>
</template>

<script>
  import { linkTo } from '../utils'

  export default {
    name: 'targetSelect',
    data () {
      return {
        step: 1,
        flags: [
          {name: '保温瓶泡枸杞要养生'},
          {name: '每顿少吃一口饭'},
          {name: '再也不立Flag'},
          {name: '至少学一门小语种'},
          {name: '不再取悦别人'},
          {name: '每天喝够8杯水'},
          {name: '不吃泡面'},
          {name: '变瘦'},
          {name: '多认识一些新的朋友'},
          {name: '买台爱疯'},
          {name: '每月跟好友聚一次'},
          {name: '看完10本书'},
          {name: '不做低头族'},
          {name: '涨工资'},
          {name: '暴富'},
          {name: '要健身'},
          {name: '看一次日出'},
          {name: '换个新发型'},
          {name: '拒绝懒癌'},
          {name: '学会理财'},
        ],
        selectFlags: [],
        flag: '',
        userInfo: null
      }
    },
    methods: {
      linkTo (url) {
        linkTo(url);
      },
      checkboxChange (e) {
        this.selectFlags = e.target.value
        console.log(this.flags)
      },
      addFlag () {
        this.flags.unshift({name: this.flag})
        this.selectFlags.unshift(this.flag)
        this.flag = ''
      },
      goNext () {
        if (this.selectFlags.length > 5) {
          wx.showToast({
            title: '您立了太多Flag了，先立5个好吗？',
            icon: 'none'
          });
          return;
        }
        wx.setStorageSync('selectFlags', JSON.stringify(this.selectFlags))
        this.$router.push('/pages/targetDraw')
      },
      getUserInfo (e) {
        console.log(e)
        this.goNext();
      }
    },
    onLoad () {
      let that = this
      wx.getUserInfo({
        success: function(res) {
          that.userInfo = res.userInfo
        }
      })
    }
  }
</script>


<style lang="less">
  .wrap {
    h3 {
      position: relative;
      line-height: 80rpx;
      padding: 0 50rpx;
      font-size: 30rpx;
      font-weight: bold;
      span {
        color: #ef6009;
        font-size: 24rpx;
        font-weight: normal;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 10rpx;
        height: 30rpx;
        margin: auto 0;
        background-color: #e64d45;
      }
    }
    .list-wrap {
      margin: 0 20rpx 30rpx;
      padding: 0 30rpx;
      height: calc(100vh - 360rpx);
      overflow: auto;
      background: #fff;
      border-radius: 10rpx;
      box-shadow: 0 0 10rpx rgba(224, 224, 224, .4);
      li {
        line-height: 80rpx;
        checkbox {
          margin-right: 10rpx;
        }
      }
    }
    .extra-wrap {
      width: 650rpx;
      margin: 20rpx auto;
      padding: 10rpx;
      border: 1px solid #ddd;
      border-radius: 10rpx;
      .ipt {
        width: 430rpx;
        height: 60rpx;
        padding-left: 10rpx;
        line-height: 60rpx;
      }
      .flag-btn {
        width: 200rpx;
        height: 60rpx;
        line-height: 60rpx;
        color: #fff;
        font-size: 28rpx;
        background-color: #e64d45;
      }
    }
    .next-btn {
      width: 650rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      background-color: #5ea732;
    }
  }
</style>
