import Wx from 'weixin-js-sdk'
import { getWechatInfo } from '@/api/wechat'

const Console = window.console // eslint no-console的原因，这里重新赋值一个新的console

// 微信初始化配置方法
export const SetWxConfig = async (configOption) => {
  const { code, nonceStr, debug } = configOption
  const url = `${window.location.origin}/` // 域名链接
  const timestamp = `${new Date().getTime()}` // 时间戳
  // 获取签名和公众号信息
  const { signature, appId } = await getWechatInfo({ // 主要是获取签名和公众号的唯一标识appId
    code,
    noncestr: nonceStr,
    timestamp,
    url
  })

  // 初始化微信配置
  Wx.config({
    debug, // 是否开启调试模式
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // // 必填，签名
    jsApiList: [ // / 必填，需要使用的JS接口列表
      // 后续需要其他的jsApi 在此添加
      'updateAppMessageShareData', // 自定义“分享给朋友”的分享内容
      'updateTimelineShareData' // 自定义“分享到朋友圈”的分享内容
    ]
  })
  Wx.error(function (res) {
    Console.log(res)
  })
}

// 微信配置分享方法
export const WxShare = async (option) => {
  const defaultOptions = {
    code: process.env.VUE_APP_WXPUBLIC_HXT, // 公众号标识（默认火星堂公众号）
    link: window.location.href, // 分享链接（默认当前页面链接）
    title: '', // 分享标题
    desc: '', // 分享描述
    imgUrl: '', // 分享图的url
    nonceStr: '2sofgcmdj28eqwr', // 生成签名的随机字符串
    debug: process.env.VUE_APP_REQ_DEBUG === '1', // debug
    successFun: function () {} // 成功分享回调（就是发起分享，触发的回调方法，但是实际有没有继续进行分享操作，不得而知）
  }
  const options = Object.assign(defaultOptions, option) // 合并配置
  const { code, nonceStr, debug, ...rest } = options

  // 初始化微信配置
  await SetWxConfig({ code, nonceStr, debug }) // 初始化微信配置之后再执行Wx.ready方法

  // 配置分享
  Wx.ready(function () {
    Wx.updateAppMessageShareData({ ...rest })
    Wx.updateTimelineShareData({ ...rest })
  })
}

/**
分享步骤：
0、当然是需要先引入微信jssdk
1、获取微信配置,主要是获取以下几个字段
({
appId: // 必填，公众号的唯一标识
timestamp: re.timestamp, // 必填，生成签名的时间戳
nonceStr: re.nonceStr, // 必填，生成签名的随机串
signature: re.signature,// 必填，签名)
})
2、初始化微信配置
  // 初始化微信配置
  Wx.config({
    debug, // 是否开启调试模式
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // // 必填，签名
    jsApiList: [ // / 必填，需要使用的JS接口列表
      // 后续需要其他的jsApi 在此添加
      'updateAppMessageShareData', // 自定义“分享给朋友”的分享内容
      'updateTimelineShareData' // 自定义“分享到朋友圈”的分享内容
    ]
  })
3、注意需要初始化微信分享之后，才能初始化加载微信分享的方法 Wx.ready，合并vue文件的分享参数，初始化微分享

使用方法
    setShareInfo (resourceUrl) {
      // 提供给APP的分享信息
      this.$root.store.setShareInfoAction({
        shareTitle: this.title,
        shareDesc: '',
        shareLink: `/banner/${this.bannerId}`,
        shareImgUrl: resourceUrl,
      })
      // 微信分享配置
      this.$IsInWechatOrQQ && WxShare({
        title: this.title,
        imgUrl: resourceUrl,
      })
    },

 */
