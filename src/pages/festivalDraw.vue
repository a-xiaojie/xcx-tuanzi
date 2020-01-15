<template>
  <div class="wrap">
    <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" style="width: 100%">
      <view class="img-item"
            :class="{active: activeIndex === index}"
            v-for="(item, index) in templates"
            :key="index"
            @tap="imgClick(index)"
      >
        <img :src="item.imgUrl">
      </view>
    </scroll-view>
    <div class="canvas-container">
      <canvas :style="{width: width + 'px', height: height + 'px',position: 'fixed', left: '9999px'}" canvas-id="myCanvas"></canvas>
    </div>
    <div class="show" :class="'temp' + activeIndex">
      <img :src="templates[activeIndex].imgUrl" mode="aspectFit" alt="">
      <div class="text" :style="{top: templates[activeIndex].y - 30 + 'rpx', left: templates[activeIndex].x + 'rpx', width: templates[activeIndex].textWidth + 'rpx'}">
        {{texts[activeTextIndex]}}
        <div class="userinfo" v-if="userInfo">——{{userInfo.nickName}}</div>
      </div>
    </div>
    <div class="flex buttons">
      <button @tap="switchText" class="switch-btn">换个文案</button>
      <button open-type="share" class="share-btn">分享给好友</button>
      <button @tap="saveToAlbum" class="save-btn">保存到相册</button>
    </div>
  </div>
</template>

<script>
  import { linkTo } from '../utils'
  import wxAsync from '../utils/wxAsync'

  export default {
    name: 'festival',
    data () {
      return {
        templates: [
          {
            imgUrl: '/static/images/festival/bg1.jpg',
            textWidth: 360,
            x: 190,
            y: 480
          },
          {
            imgUrl: '/static/images/festival/bg2.jpg',
            textWidth: 360,
            x: 100,
            y: 190
          },
          {
            imgUrl: '/static/images/festival/bg3.jpg',
            textWidth: 360,
            x: 330,
            y: 190
          }
        ],
        texts: [
          '清蒸鱼，糖醋鱼，水煮鱼，酸菜鱼，鱼乐无穷，如鱼得水，鱼目混珠，尔鱼我炸，鱼无伦次，祝你鼠年快乐！年年有余！',
          '忙忙碌碌一整年，只为等到这一天， 虽然年底没红包，发发短信也过年。祝你新年快乐，万事如意！',
          '装满一车幸福，让平安开道，抛弃一切烦恼，让快乐与您环绕，存储所有温暖，将寒冷赶跑，释放一生真情，让幸福永远对您微笑！',
          '除夕夜温馨的氛围：烟火、钟声、灯影以及我这小小的祝福;传达着节日的讯息：快乐、和谐、平安。',
          '大年三十,欢声不断;电话打搅,多有不便;短信拜年,了我心愿;祝你全家,身体康健;生活幸福,来年多赚;提早拜年,免得占线！',
          '闭上眼睛，我小小的心愿会在新年晚钟里飞临在你的窗前，和你鼠年所希冀的梦幻轻轻地重叠，恭喜发财！',
          '金猪跑，玉鼠跳，噼啪噼啪新年到；穿新衣，戴新帽，大红灯笼高高照；福也到，运也到，大家都把财神抱；拼祝福，看谁早，恭祝大家新年好！',
          '新年到，祝福到，送欢乐，保平安，愿你幸福健康，如意顺心，欢乐多多，吉祥好运，万事顺利，鼠年大吉，万事如意！',
          '鼠年到，向你问个好：办事处处顺，生活步步高，好运天天交，打牌场场胜，口味顿顿好，越活越年轻，越长越俊俏，家里出黄金，墙上长钞票！',
          '祝您新年：身上不长膘，人前你最俏；手头有钞票，梦里都在笑。',
          '喜迎鼠年，愿君身体健康，福寿绵长，吉祥如意，财源滚滚，心想事成，万事顺利，新年快乐，好运平安！',
          '蹦蹦跳跳鼠年到，吉祥如意好运来，万事顺利身体健，健康平安喜事多，财源滚滚乐翻天，祝君新年快乐，幸福开心，年年有福，岁岁平安！',
          '鼠年到来喜连连，高高兴兴迎鼠年，万事如意平安年，扬眉吐气顺心年，梦想成真发财年，事业辉煌成功年，祝你岁岁有好年！',
          '鼠年到，鸿运旺，烦恼的事儿往边靠，祝君出门遇贵人，在家听喜报！年年有今日，岁岁有今朝！鼠年快乐，大吉大利！',
          '新年到，开口笑，钞票大把怀里抱！贴福字，迎新春，吉祥如意都来到！短信飞，祝福追，财神跟在后面跑！祝你新年哈哈开口笑，一年更比一年好！',
          '鼠年带着喜庆来，祝福伴着开心到，愿你工作爱情双喜临门，新朋老友心心相印，财运和你纠缠不清，福运和你形影不分。祝你吉祥之年事事如意，步步高升。',
          '鼠年到了，让快乐的子弹飞一会儿，击毙你所有的烦恼和霉运，带去海量的快乐和幸福，传递我真诚的祝福和心愿：身体健康，万事如意，鼠年大吉！',
          '幸福环绕鼠年，让时光格外温暖；好运邂逅鼠年，让生活无限美满；成功守候鼠年，让季节璀璨斑斓；祝福伴随鼠年，让心情总是灿烂。鼠年到了，愿你的生活比蜜甜！',
        ],
        width: 750,
        height: 1333,
        imgUrl: '',
        activeIndex: 0,
        activeTextIndex: 0,
        userInfo: null
      }
    },
    methods: {
      linkTo (url) {
        linkTo(url);
      },
      scroll (e) {
        console.log(e)
      },
      async saveToAlbum () {
        wx.showLoading({
          title: '图片生成中...',
        })
        const temp = await wxAsync({
          api: 'canvasToTempFilePath',
          params: {
            canvasId: 'myCanvas'
          }
        });
        console.log('drawing temp', temp)
        this.imgUrl = temp.tempFilePath
        wx.hideLoading()

        const res = await wxAsync({
          api: 'getSetting'
        })
        const that = this
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意小程序相册功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
              that.startSaveImage()
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
      },
      imgClick (idx) {
        this.activeIndex = idx;
        this.draw()
      },
      async draw () {
        const imgItem = this.templates[this.activeIndex]
        try {
          var ctx = wx.createCanvasContext('myCanvas')
          const x = this.width / 2

          ctx.drawImage(imgItem.imgUrl, 0, 0, this.width, this.height);
          ctx.save();

          ctx.setFontSize(36) //字体大小
          ctx.setFillStyle('#fbbd28') //字体颜色
          ctx.textAlign = "left"; //文字居中

          this.drawText(ctx, imgItem)

          // const avatar = await wxAsync({
          //   api: 'getImageInfo',
          //   params: {
          //     src: this.userInfo.avatarUrl
          //   }
          // })
          // console.log('avatar', avatar)
          // ctx.save();
          // ctx.beginPath(); //开始绘制
          // ctx.arc(x,120,60, 0, 2 * Math.PI)
          // ctx.setStrokeStyle('#ffffff')
          // ctx.lineWidth = 10
          // ctx.stroke();
          // ctx.clip(); //剪切
          // ctx.drawImage(avatar.path, x - 60, 60, 120, 120); //userHeader  // 推进去图片必须是https
          // ctx.restore(); //恢复之前保存的绘图上下文 继续绘制

          ctx.draw()
        } catch (e) {
          console.log(e)
        }
      },
      drawText (ctx, imgItem) {
        const text = this.texts[this.activeTextIndex]
        let top = imgItem.y
        const chr =text.split('');//这个方法是将一个字符串分割成字符串数组
        let temp = '';
        let row = [];

        for (let a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < imgItem.textWidth) {
            temp += chr[a];
          }
          else {
            a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
            row.push(temp);
            temp = '';
          }
        }
        row.push(temp);

        for (let b = 0; b < row.length; b++) {
          ctx.fillText(row[b], imgItem.x, top, imgItem.textWidth);
          top += 60
        }

        ctx.setFontSize(40) //字体大小
        ctx.textAlign = "right";
        if (this.userInfo && this.userInfo.nickName) {
          ctx.fillText('——' + this.userInfo.nickName, imgItem.x + imgItem.textWidth, top + 60, imgItem.textWidth)
        }
      },
      switchText () {
        this.activeTextIndex = Math.floor(Math.random() * this.texts.length);
        this.draw();
      }
    },
    onLoad () {
      wx.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo
          this.draw()
        }
      })
    },
    onShareAppMessage () {
      return {
        title: `您有一个来自${this.userInfo.nickName}的新年祝福`,
        path: '/pages/festival'
      }
    }
  }
</script>


<style lang="less">
  .wrap {
    height: 100vh;
    .scroll-view_H {
      height: 186rpx;
      padding: 20rpx;
      box-shadow: 0 10rpx 10rpx rgba(224, 224, 224, .4);
      .img-item {
        display: inline-block;
        padding: 2rpx;
        margin: 0 20rpx;
        vertical-align: middle;
        border: 1px solid #fff;
        &.active {
          border-color: #e64d45;
        }
      }
      img {
        width: 101rpx;
        height: 180rpx;
        margin: 0 auto;
      }
    }
    .show {
      position: relative;
      width: 750rpx;
      height: 1333rpx;
      margin: 0 auto;
      transform: scale(.5);
      transform-origin: center 20rpx;
      img {
        width: 750rpx;
        height: 1333rpx;
      }
      .text {
        position: absolute;
        font-size: 36rpx;
        line-height: 60rpx;
        color: #fbbd28;
      }
      .userinfo {
        margin-top: 60rpx;
        line-height: 60rpx;
        font-size: 40rpx;
        text-align: right;
      }
    }
    .canvas-container {
      width: 0;
      height: 0;
      overflow: hidden;
      transform: scale(.4);
      transform-origin: 0 0;
    }
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
      position: fixed;
      top: 950rpx;
      left: 0;
      right: 0;
      padding: 0 20rpx;
      button {
        width: 220rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: #fff;
        font-size: 34rpx;
        &.switch-btn {
          background-color: #fed334;
        }
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
