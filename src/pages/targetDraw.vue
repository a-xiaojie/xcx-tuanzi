<template>
  <div class="wrap">
    <div style='overflow:hidden;width:0;height:0;'>
      <canvas :style="{width: width + 'px', height: height + 'px',position: 'fixed', left: '9999px'}" canvas-id="firstCanvas" v-show="!imgUrl"></canvas>
    </div>
    <div class="img-wrap flex items-center justify-center">
      <img :src="imgUrl" mode="aspectFit" v-if="imgUrl">
      <p v-else>图片正在生成中...</p>
    </div>
    <div class="flex buttons">
      <button open-type="share" class="share-btn">分享给好友</button>
      <button @tap="saveToAlbum" class="save-btn">保存到相册</button>
    </div>
  </div>
</template>

<script>
  import { linkTo } from '../utils'
  import wxAsync from '../utils/wxAsync'

  export default {
    name: 'targetDraw',
    data () {
      return {
        selectFlags: [],
        width: 750,
        height: 1200,
        imgUrl: ''
      }
    },
    methods: {
      linkTo (url) {
        linkTo(url);
      },
      async draw () {
        var ctx = wx.createCanvasContext('firstCanvas')
        const x = this.width / 2

        ctx.drawImage('/static/images/target/bg.jpg', 0, 0, this.width, this.height);
        const avatar = await wxAsync({
          api: 'getImageInfo',
          params: {
            src: this.avatarUrl
          }
        })
        ctx.save();
        ctx.beginPath(); //开始绘制
        ctx.arc(x,120,60, 0, 2 * Math.PI)
        ctx.setStrokeStyle('#ffffff')
        ctx.lineWidth = 10
        ctx.stroke();
        ctx.clip(); //剪切
        ctx.drawImage(avatar.path, x - 60, 60, 120, 120); //userHeader  // 推进去图片必须是https
        ctx.restore(); //恢复之前保存的绘图上下文 继续绘制

        ctx.setFontSize(40) //字体大小
        ctx.setFillStyle('#ef6009') //字体颜色
        ctx.textAlign = "left"; //文字居中

        for (let i = 0; i < this.selectFlags.length; i++) {
          ctx.fillText(`${i + 1}. ${this.selectFlags[i]}`, 80, 465 + i * 104);
        }
        ctx.draw(true, setTimeout(async () => {
          const temp = await wxAsync({
            api: 'canvasToTempFilePath',
            params: {
              canvasId: 'firstCanvas'
            }
          });
          console.log(temp)
          this.imgUrl = temp.tempFilePath
        },2000))
      },
      async saveToAlbum () {
        const res = await wxAsync({
          api: 'getSetting'
        })
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意小程序相册功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
              this.startSaveImage()
            }
          })
        } else {
          this.startSaveImage()
        }
      },
      startSaveImage () {
        wx.saveImageToPhotosAlbum({
          filePath: this.imgUrl,
          success(res) {
            wx.showToast({
              title: '保存成功！',
            });
          }
        })
      }
    },
    onLoad () {
      let selectFlags = wx.getStorageSync('selectFlags')
      selectFlags = selectFlags ? JSON.parse(selectFlags) : []
      this.selectFlags = selectFlags
      wx.getUserInfo({
        success: (res) => {
          const userInfo = res.userInfo
          this.nickName = userInfo.nickName
          this.avatarUrl = userInfo.avatarUrl;
          this.draw()
        }
      })
    },
    onShareAppMessage () {
      return {
        title: '【有人@你】一键生成你的2020年Flag清单',
        path: '/pages/target'
      }
    }
  }
</script>


<style lang="less">
  .wrap {
    padding-top: 30rpx;
    .img-wrap {
      height: 800rpx;
      text-align: center;
      font-size: 26rpx;
      color: #999;
      img {
        display: block;
        width: 500rpx;
        height: 800rpx;
        margin: 0 auto;
      }
    }
    .buttons {
      margin-top: 30rpx;
      button {
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: #fff;
        &.share-btn {
          background-color: #e64d45;
        }
        &.save-btn {
          background-color: #5ea732;
        }
      }
    }
  }
</style>
