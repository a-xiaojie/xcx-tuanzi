<template>
  <div class="wrap">
    <img src="/static/images/target/bg.png" alt="" class="bg">
    <div class="content">
      <div class="time">现在是{{time}}</div>
      <div class="left-time">
        <div class="title">2020年余额还剩下</div>
        <p class="days"><strong>{{leftTimes.newDay}}</strong>天</p>
        <p class="hours"><span>{{leftTimes.newHour}}</span>时<span>{{leftTimes.newMinute}}</span>分</p>
      </div>
      <div class="tip">
        <button class="btn" @tap="linkTo('/pages/targetSelect')">马上去立Flag>></button>
      </div>
    </div>
  </div>
</template>

<script>
  import { linkTo, formatNumber } from '../utils'

  export default {
    name: 'target',
    computed: {
      time () {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()

        const hour = now.getHours()
        const minute = now.getMinutes()
        return `${year}年${month}月${day}日 ${formatNumber(hour)}:${formatNumber(minute)}`
      },
      leftTimes () {
        const date = new Date();
        const year = date.getFullYear();
        const newDate = new Date();
        newDate.setFullYear(year + 1);
        newDate.setMonth(0, 1);
        newDate.setHours(0, 0, 0);
        const itime = newDate.getTime() - date.getTime();
        const isecond = parseInt(itime / 1000);
        const newDay = parseInt(isecond / 24 / 60 / 60);
        const modeDay = isecond % (24 * 60 * 60);
        const newHour = parseInt(modeDay / 60 / 60);
        const modeHour = modeDay % (60 * 60);
        const newMinute = parseInt(modeHour / 60);
        return {
          newDay,
          newHour,
          newMinute
        }
      }
    },
    methods: {
      linkTo (url) {
        linkTo(url);
      },
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
      left: 0;
      width: 750rpx;
      height: 100vh;
    }
    .content {
      position: relative;
      padding: 0 50rpx;
      height: 100vh;
    }
    .time {
      position: absolute;
      font-size: 30rpx;
      line-height: 40rpx;
      top: 20%;
      color: #666;
    }
    .left-time {
      position: absolute;
      top: 30%;
      left: 0;
      right: 0;
      text-align: center;
      .title {
        line-height: 80rpx;
        color: #e64d45;
      }
      .days {
        height: 250rpx;
        color: #e64d45;
        font-size: 40rpx;
        line-height: 250rpx;
        strong {
          display: inline-block;
          font-size: 200rpx;
          font-weight: bold;
        }
      }
      .hours {
        font-size: 26rpx;
        line-height: 40rpx;
        color: #e64d45;
        span {
          display: inline-block;
          padding: 0 10rpx;
          margin: 0 10rpx;
          color: #fff;
          background: #e64d45;
          border-radius: 4rpx;
        }
      }
    }
    .tip {
      position: absolute;
      bottom: 150rpx;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      button {
        width: 500rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: #fff;
        font-size: 30rpx;
        background-color: #e64d45;
        border-radius: 50rpx;
      }
    }
  }
</style>
