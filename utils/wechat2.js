/* eslint-disable one-var */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable standard/object-curly-even-spacing */

import { fillParams } from './url-utils'
import { isIOS, isAndroid, getQlchatVersion} from './envi';
+function copy (obj) {
  // JSON解析之类的其实如果给定格式不对很容易出错滴，自己做好检验~
  return JSON.parse(JSON.stringify(obj))
}

// 获取微信config
export async function getWxConfig () {
  let result = await fetch('/api/js-sdk/wx/config', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    credentials: 'include'
  }).then((res) => res.json())
  console.log(result)
  return result
}

/**
 * 重新进行微信config, 针对android机单页面切换后微信sdk调用失败的情况
 */
export async function reConfig (debug) {
  // 苹果不需要重新config
  // if (isIOS()) {
  //     return;
  // }
  const re = await getWxConfig()
  console.log('**************getWxConfig******************')
  console.log(re)
  wx.config({
    debug: !!debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: re.appId, // 必填，公众号的唯一标识
    timestamp: re.timestamp, // 必填，生成签名的时间戳
    nonceStr: re.nonceStr, // 必填，生成签名的随机串
    signature: re.signature, // 必填，签名
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ] // 必填，需要使用的JS接口列表
  })
}

/**
 * 微信分享（朋友、朋友圈、QQ、webbo、QQ空间）方法封装
 * @Author   fisher<wangjiang.fly.1989@163.com>
 * @DateTime 2016-11-25T11:09:38+0800
 * @param    {}    opts
 *     opts.title           分享标题
 *     opts.timelineTitle   朋友圈分享标题，为空时取opts.title
 *     opts.appTitle        朋友分享标题，为空时取opts.title
 *     opts.qqTitle         qq分享标题，为空时取opts.title
 *     opts.weiboTitle      weibo分享标题，为空时取opts.title
 *     opts.qzTitle         QZone分享标题，为空时取opts.title
 *
 *     opts.desc            分享描述
 *         注：不同平台描述和title配置方式类似：timelineDesc、appDesc、qqDesc、weiboDesc、qzDesc
 *     opts.shareUrl            分享的链接，为空时取当前页面完整url
 *     opts.imgUrl          分享的图片链接
 *     opts.successFn       分享成功后的回调方法
 *     opts.cancelFn        取消分享时的回调方法
 *     opts.extConfig       其他配置
 *
 *
 */
export function share (opts) {
  opts = opts || {}

  // this.reConfig();

  // 不指定分享链接时，默认取当前页地址
  if (!opts.shareUrl) {
    opts.shareUrl = window.location.href
  }

  // Todo 根据需要可能要调整或去掉
  var newShareUrl = opts.shareUrl
  // if (opts.shareUrl.indexOf('__sharem=1') > -1) {
  //     newShareUrl = opts.shareUrl;
  // } else {
  //     newShareUrl = opts.shareUrl.replace(/http[s]{0,1}\:\/\/m\.qlchat\.com/, 'http://v' + (Math.random() * 9).toFixed(0) + '.qianliao.tv');
  // }

  // 去掉重复参数以及state, code参数
  newShareUrl = fillParams({
    // _src: 'wx_share' // 标识为微信分享
  }, newShareUrl, ['code', 'state', 'loginType', 'authDataKey'])

  // 打个log
  var successFn = function () {
    if (window._qla) {
		    setTimeout(function () {
			    typeof _qla !== 'undefined' && _qla('event', {
				    category: 'wechat-share',
          action: 'success',
          ...opts.successLogParams
			    })
      }, 100)
    }
    opts.successFn && opts.successFn()
  }

  // 分享参数
  var shareOptions = {
      title: opts.title,
      desc: opts.desc,
      link: newShareUrl,
      imgUrl: opts.imgUrl,
      success: successFn,
      cancel: opts.cancelFn || function () {}
    },
    shareAppOptons = copy(shareOptions),
    shareTimelineOptions = copy(shareOptions),
    shareQQOptions = copy(shareOptions),
    shareWeiboOptions = copy(shareOptions),
    shareQZoneOptions = copy(shareOptions)

  shareAppOptons.success = successFn
  shareTimelineOptions.success = successFn
  shareQQOptions.success = successFn
  shareWeiboOptions.success = successFn
  shareQZoneOptions.success = successFn

  shareAppOptons.cancel = opts.cancelFn || function () {}
  shareTimelineOptions.cancel = opts.cancelFn || function () {}
  shareQQOptions.cancel = opts.cancelFn || function () {}
  shareWeiboOptions.cancel = opts.cancelFn || function () {}
  shareQZoneOptions.cancel = opts.cancelFn || function () {}

  // 分享给朋友
  if (opts.appTitle) {
    shareAppOptons.title = opts.appTitle
  }
  if (opts.appDesc) {
    shareAppOptons.desc = opts.appDesc
  }

  // 分享到朋友圈
  if (opts.timelineTitle) {
    shareTimelineOptions.title = opts.timelineTitle
  }
  if (opts.timelineDesc) {
    shareTimelineOptions.desc = opts.timelineDesc
  }

  // 分享到QQ
  if (opts.qqTitle) {
    shareQQOptions.title = opts.qqTitle
  }
  if (opts.qqDesc) {
    shareQQOptions.desc = opts.qqDesc
  }

  // 分享到微博
  if (opts.weiboTitle) {
    shareWeiboOptions.title = opts.weiboTitle
  }
  if (opts.weiboDesc) {
    shareWeiboOptions.desc = opts.weiboDesc
  }

  // 分享到QQ空间
  if (opts.qzTitle) {
    shareQZoneOptions.title = opts.qzTitle
  }
  if (opts.qzDesc) {
    shareQZoneOptions.desc = opts.qzDesc
  }

  function _initSahreConfig () {
    if (typeof wx === 'undefined') {
      return
    }
    wx.onMenuShareAppMessage(shareAppOptons)
    wx.onMenuShareTimeline(shareTimelineOptions)
    wx.onMenuShareQQ(shareQQOptions)
    wx.onMenuShareWeibo(shareWeiboOptions)
    wx.onMenuShareQZone(shareQZoneOptions)

    wx.showAllNonBaseMenuItem()

    if (opts.extConfig) {
      opts.extConfig(wx)
    }
  }

  // 手机平台
  if (isAndroid() || isIOS()) {
    typeof wx !== 'undefined' && wx.ready(function () {
      _initSahreConfig()
    })

    // pc平台
  } else {
    setTimeout(function () {
      _initSahreConfig()
    }, 500)
  }
};

export function appShare (opts) {
  var ver = getQlchatVersion()
  if (ver && ver > 360) {
    window.qlchat.onMenuShareWeChatTimeline({
      type: 'link', // "link" "image"
      content: opts.shareUrl,
      title: opts.timelineTitle,
      desc: opts.timelineDesc,
      thumbImage: opts.imgUrl
    })
    window.qlchat.onMenuShareWeChatFriends({
      type: 'link', // "link" "image"
      content: opts.shareUrl,
      title: opts.title,
      desc: opts.desc,
      thumbImage: opts.imgUrl
    })
  }
}

export function closeShare () {
  typeof wx !== 'undefined' && wx.ready(function () {
    wx.hideAllNonBaseMenuItem()
  })
};
