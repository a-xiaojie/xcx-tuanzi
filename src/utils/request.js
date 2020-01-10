import {DEFAULT_CONFIG} from '../constants';
const baseURL = process.env.API_BASE_URL

export function request (url, data, method = 'GET', header) {
  return new Promise((resolve, reject) => {
    if (url.indexOf('//') === -1) {
      url = baseURL + url
    }
    header = Object.assign({}, header)

    let xcxToken = wx.getStorageSync('xcxToken') || '1'
    header['XCXSessionId'] = xcxToken
    if (!url.includes('gw-api.pinduoduo.com')) {
      header = Object.assign({}, header, {channel: DEFAULT_CONFIG.channel});
    }
    console.log('reqUrl:', url, 'reqData:', data);
    wx.request({
      url,
      data,
      method,
      header,
      async success (res) {
        if (res.statusCode !== 200) {
          let msg = res.errMsg
          if (msg === 'request:ok') {
            msg = JSON.stringify(res.data)
          }
          msg = `[${res.statusCode}] ${msg}`
          wx.showModal({
            title: '网络异常',
            content: '您当前的网络环境好像有点问题，请检查后重试~',
            showCancel: false,
            confirmColor: '#ff2551'
          })
          reject(res)
        } else {
          if (res.data) {
            if (res.data.status === 401) {
              // 未授权
              const res = await store.dispatch('login');
              if (res && res.status === 1) {
                return resolve(await request(url, data, method, header));
              }
              return;
            }
            if (!url.includes('gw-api.pinduoduo.com') && res.data.status !== 1) {
              wx.showModal({
                title: '系统提示',
                content: res.data.msg || '',
                showCancel: false,
                confirmColor: '#ff2551'
              });
              reject(res);
              return
            }
            // console.log('res:', res.data);
            resolve(res.data)
          } else {
            reject(res)
          }
        }
      },
      fail (ret) {
        reject(ret)
      }
    })
  })
}
