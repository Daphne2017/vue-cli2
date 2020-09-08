/*
 * file: 常用的canvas卡片绘制工具函数
 * Created on Thu Jan 31 2019
 * Created by zhouzh1
 * Copyright (c) 2019 Qlchat
 */

/*
多行文字显示，可指定文本位置，最大行数，宽度，行高
这个写得真是好
distX, distY,width, maxLine, lineHeight
*/
/**
 * 多行文字显示，可指定文本位置，最大行数，宽度，行高
 * @param {any} ctx        canvas 的 getContext('2d')
 * @param {string} text    文本
 * @param textObj          文本显示样式设置
 * {
    distX:number,
    distY:number,
    width:number,
    color:string,
    bolder:boolean,
    maxLine:number,
    fontWeight: string,
    lineHeight:number,
 }
 * @param {string} fontFamiry   字体，可选，默认值微软雅黑
 */
function multiText (ctx, text, textObj, fontFamiry = '微软雅黑') {
  let { left, top, width, maxLine, lineHeight = '20', font, color, fontWeight, bolder } = textObj
  ctx.save()
  ctx.font = (fontWeight ? (fontWeight + ' ') : '') + font + 'px ' + fontFamiry
  ctx.fillStyle = color
  var words = text.split('')
  var line = ''
  var lines = 1

  for (var i = 0; i < words.length; i++) {
    line += words[i] //  循环去累加文字
    /* 文字内容全部取完，直接绘制文字 */
    if (i === words.length - 1) { // 如果所有文字总数的宽度没有累加达到设置的宽度，那就一行画完
      ctx.fillText(line, left, top, width)
      break
    }
    if (ctx.measureText(line).width >= width) { // 如果当前行文字的宽度已经超出了限制的宽度就换行
      /* 已经到达最大行数，用省略号代替后面的部分 */
      if (lines === maxLine) { // 达到当前设置的最大行数就加省略号
        line = line.slice(0, line.length - 3) + '...'
      }
      ctx.fillText(line, left, top, width) // 开始画当前一行
      if (lines === maxLine) { // 已经等于最大的行数了，就不在往后画了
        break
      }
      line = ''
      top += lineHeight
      lines += 1
    }
  }
  ctx.restore()
};

/**
* 时间戳的格式化
* @param {number} timeStamp 时间戳
* @param {string} line 分隔符，可选。默认值为'-'
*/
function timeParse (timeStamp, line = '-') {
  var t = new Date(timeStamp)
  var week = ''

  switch (t.getDay()) {
    case 1: week = '一'; break
    case 2: week = '二'; break
    case 3: week = '三'; break
    case 4: week = '四'; break
    case 5: week = '五'; break
    case 6: week = '六'; break
    case 0: week = '日'; break
  }

  var month = t.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var day = t.getDate()
  if (day < 10) {
    day = '0' + day
  }

  var hours = t.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }

  var monutes = t.getMinutes()
  if (monutes < 10) {
    monutes = '0' + monutes
  }
  const formateTime = {}
  formateTime.date = t.getFullYear() + line + month + line + day
  formateTime.day = '星期' + week + ' '
  formateTime.time = hours + ':' + monutes
  return formateTime
}

/**
* 绘制单行文本
* @param {any} ctx        canvas 的 getContext('2d')
* @param {string} text    文本
* @param {object} textObj 文本显示样式设置
* {
  left:number,
  top:number,
  font:number,
  color:string,
  fontWeight: string,
  bolder:boolean }
* @param {string} fontFamiry   字体，可选，默认值微软雅黑

*/
function isObject (val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}
function drawText (ctx, text, textObj, fontFamiry = '微软雅黑') {
  let { left, top, font, color, fontWeight, align = 'left', suffix } = textObj
  let suffixLeft = left

  if (isObject(suffix)) { // 判断对齐方式
    ctx.font = (fontWeight ? (fontWeight + ' ') : '') + font + 'px ' + fontFamiry
    // ctx.font: 可设置的属性是（按顺序）： "font-style font-variant font-weight font-size/line-height font-family"
    // 这里只设置了三种font-weight font-size/line-height font-family
    const textWidth = ctx.measureText(text).width // 在画布上输出文本之前，检查字体的宽度。
    // if (align === 'center') {  // 目前还不知道这个align有什么鬼用
    //   left = left - textWidth / 2
    // }
    // measureText()方法返回一个对象，该对象包含以像素计的指定字体宽度。
    const drawSuffixLoop = (topSuffix, textWidth) => {
      if (isObject(topSuffix)) {
        if (topSuffix && topSuffix.text && topSuffix.font) {
          let { text: suffixText, font: suffixFont, color: suffixColor, fontWeight: suffixFontWeight, lSpace = 0, suffix } = topSuffix
          ctx.font = (suffixFontWeight ? (suffixFontWeight + ' ') : '') + suffixFont + 'px ' + fontFamiry
          ctx.fillStyle = suffixColor || color
          const suffixTextWidth = ctx.measureText(suffixText).width
          suffixLeft += textWidth + lSpace
          ctx.fillText(suffixText, suffixLeft, top)
          suffix && drawSuffixLoop(suffix, suffixTextWidth)
        }
      }
    }
    drawSuffixLoop(suffix, textWidth) // 循环去画drawText
  }
  ctx.font = (fontWeight ? (fontWeight + ' ') : '') + font + 'px ' + fontFamiry
  ctx.fillStyle = color
  ctx.fillText(text || textObj.text, left, top)
}

/**
* 绘制单行文本,可以指定字的大小
* @param {any} ctx        canvas 的 getContext('2d')
* @param {string} str     文本
* @param {object} textObj 文本显示样式设置
* {
  x:number,
  y:number,
  spaceWidth:number,
  font:number,
  color:string,
  bolder:boolean}
* @param {string} fontFamiry    字体，可选，默认值微软雅黑
*/
function drawTextSpace (ctx, str, textObj, fontFamiry = '微软雅黑') {
  let { left, top, font, color, fontWeight, spaceWidth } = textObj
  var strArray = str.split('')
  var textLeft = left
  for (var i = 0; i < strArray.length; i++) {
    ctx.font = (fontWeight ? (fontWeight + ' ') : '') + font + 'px ' + fontFamiry
    ctx.fillStyle = color
    textLeft += (i === 0 ? 0 : ctx.measureText(strArray[i - 1]).width) + spaceWidth
    console.log('textLeft', textLeft)
    ctx.fillText(strArray[i], textLeft, top)
  }
}

/**
* 画圆角矩形块，渐变色块
*（可以用于画透明层色块，渐变层）
*（可以设置上面是圆角，下面是直角 ）
* headBgClipRounded 方法如果单独使用，填充请手动加上ctx.fill();
* @param {any} ctx       canvas 的 getContext('2d')
* @param {object}clipObj 图片显示样式设置
* {
  x:number,
  y:number,
  w:number,
  h:number,
  r:{
      r_top_right:number,
      r_bottom_right:number,
      r_bottom_left:number,
      r_top_left:number
  },
  bdWidth:number, //边框的宽度厚度
  bdColor:string, //边框的颜色
  bgcolor:string, //背景色（如果isLinear为true时，bgcolor作为渐变第一色）
  isLinear:boolean,  //是否渐变
  linearColor:string,  //渐变的第二色
  }
*/
function headBgClipRounded (ctx, clipObj) {
  let { x, y, w, h, r, bdWidth, bdColor, bgcolor, isLinear, linearColor } = clipObj
  let rAll = '' // 需要裁剪的圆弧半径
  if (typeof r === 'number' || typeof r === 'string') { // 非对象，则设置所有四个圆弧角的半径为r
    rAll = r
  }
  ctx.beginPath() // beginPath() 丢弃任何当前定义的路径并且开始一条新的路径。它把当前的点设置为 (0,0)。当一个画布的环境第一次创建，beginPath() 方法会被显式地调用。这里是裁剪开始。
  ctx.moveTo(x + (rAll || r.r_top_left), y)
  ctx.lineWidth = bdWidth // 设置当前线条的宽度
  ctx.strokeStyle = bdColor // 设置或返回用于笔尖/笔锋的颜色、渐变或模式。

  if (isLinear) {
    /* 指定渐变区域 */
    var grad = ctx.createLinearGradient(x, y, x, y + h)
    /* 指定几个颜色 */
    grad.addColorStop(0, bgcolor)
    grad.addColorStop(1, linearColor)
    /* 将这个渐变设置为fillStyle */
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = bgcolor // 设置或返回用于填充绘画的颜色、渐变或模式。
  }

  ctx.arcTo(x + w, y, x + w, y + h, rAll || r.r_top_right)
  ctx.arcTo(x + w, y + h, x, y + h, rAll || r.r_bottom_right)
  ctx.arcTo(x, y + h, x, y, rAll || r.r_bottom_left)
  ctx.arcTo(x, y, x + w, y, rAll || r.r_top_left)
  ctx.stroke() // stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色
  ctx.fill() // 填充颜色 如果路径未关闭，那么 fill() 方法会从路径结束点到开始点之间添加一条线，以关闭该路径（正如 closePath() 一样），然后填充该路径
  ctx.closePath() // 关闭路径 =>beginPath()和closePath()的区别：https://www.cnblogs.com/xuehaoyue/p/6549682.html
};

/* 画图方法 */

/**
* 画图方法，指定图片的位置和宽高
* @param {any} ctx         canvas 的 getContext('2d')
* @param {string} bgUrl    图片链接
* @param {object} imageObj 图片显示样式设置
* {
  left:number,
  top:number,
  width:number,
  height:number,
  isClip?:boolean,
  x?:number,
  y?:number,
  w?:number,
  h?:number,
  r?:number,
  bdWidth?:number,
  bdColor?:string,
  bgcolor?:string,
  isLinear?:boolean,
  linearColor?:string}
* @param {function} imageProxyFunc
* @param {function} cb
*/
function drawImage (ctx, bgUrl, imageObj, imageProxyFunc, cb) {
  if (bgUrl !== '') {
    let bgImg = new Image()
    // if (/^data:image\/\w+;base64,/.test(bgUrl)) {
    // bgImg.crossOrigin = 'Anonymous';//跨域，如果是database64，则不需要这个
    // bgImg.setAttribute('crossOrigin', 'anonymous');
    // }
    bgImg.crossOrigin = 'anonymous'
    bgImg.src = imageProxyFunc ? bgUrl : bgUrl
    bgImg.onload = function () {
      __drawPic(ctx, bgImg, imageObj, cb)
    }
  } else {
    __drawPic(ctx, '', imageObj, cb) // 如果没有设置背景图，那么绘制一个方形，填充白色
  }
}

function __drawPic (ctx, bgImg, imageObj, cb) {
  console.log('imageObj', imageObj)
  let { top, left, width, height } = imageObj
  if (bgImg !== '') {
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(bgImg, left, top, width, height) // 裁剪头像
    ctx.restore() // 裁剪然后画完头像之后，恢复之前的绘画环境，之后执行回调，开始画下一个
    cb && cb()
  } else { // 如果没有背景图,直接填充白色
    console.log('left', left)
    console.log('top', top)
    console.log('width', width)
    console.log('height', height)
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.fillStyle = '#fff'
    ctx.lineTo(left + width, top)
    ctx.lineTo(left + width, top + height)
    ctx.lineTo(left, top + height)
    ctx.closePath()
    ctx.fill()
    ctx.restore() // 如果这里不加restore的话，会导致什么情况呢？会导致在clip之外的渲染都无法生效。所以还是要加上restore的
    cb && cb()
  }
}

/**
* 处理图片跨域问题，如果是符合 /^data:image\/\w+;base64,/ 规则的图片，不做处理返回原链接，其余的都要处理返回新链接；
* 该方法返回的方法参数是一个图片链接[string] 判断为空则返回空。
* @param {string} api string  接口
*/
function imageProxy (api) {
  return function (url) {
    if (url === '') return ''
    return /^data:image\/\w+;base64,/.test(url) ? url : `${api}${encodeURIComponent(url)}`
  }
}

/**
* 应用于画图圆角矩形图片
* @param ctx          canvas 的 getContext('2d')
* @param bgUrl        图片链接
* @param imageObj     图片显示样式设置
* {
  left:number,
  top:number,
  width:number,
  height:number,
  isClip?:boolean,
  x?:number,
  y?:number,
  w?:number,
  h?:number,
  r?:number,
  bdWidth?:number,
  bdColor?:string,
  bgcolor?:string,
  isLinear?:boolean,
  linearColor?:string}
* @param imageProxyFunc:any
* @param cb any
* 画经过 clip 的图片（圆形，圆角矩形）
* imageObj:{left, top, width, height, isClip, x, y, w, h, r, bdWidth, bdColor, bgcolor, isLinear, linearColor}
// 地址：https://www.jianshu.com/p/32e5eaf8f617
  首先要有“分层”的一个概念，比如 时钟的 时针、分针、 秒针
  可以想象一下，许多层玻璃面板，在不同的玻璃面板上draw完后，合在一块，就是最后的效果
  canvas.save() ;
  //在这中间draw，相当于另起了一层
  canvas.restore();
  canvas的clip方法色使用：
  地址：https://zhuanlan.zhihu.com/p/26007502
  clip()改变了绘画环境。ctx()调用后，所裁剪的区域就是clip ()后的绘制环境，clip()之后的绘画只能在裁剪区域中渲染，不能访问画布上的其他区域。
  那么我裁剪之后想要在画布其他区域上绘制，那该怎么办呢？
---------------------------save()和restore()------------------------------
那只能在裁剪clip()前使用save()方法将clip()前的绘制环境保存，clip()完成后，再利用restore()方法将之前保存的环境恢复。

*/
function drawStyleImage (ctx, imageUrl, imageObj, imageProxyFunc, cb) {
  let { left, top, width, height, isClip, x, y, w, h, r, bdWidth, bdColor, bgcolor, isLinear, linearColor } = imageObj
  ctx.save() // 保存裁剪之前的绘画环境

  if (isClip) { // 如果需要裁剪并且存在需要裁剪的圆弧半径
    r && headBgClipRounded(ctx, { x, y, w, h, r, bdWidth, bdColor, bgcolor, isLinear, linearColor }) // 开始裁剪
    ctx.clip()
  }

  drawImage(ctx, imageUrl, { left, top, width, height }, imageProxyFunc, cb) // 渲染的时候只在剪切的矩形里边画头像
}

/**
* 截取化图片某个尺寸，获取格式化后的链接
* @param {string} url   链接
* @param {string} formatStrQ   阿里云图片截取格式 "@64h_64w_1e_1c_2o"
* @param {string} formatStrW   微信图片截取格式 "/64"
*  图片截取大小格式化，获取链接 （兼容微信图片和阿里云图片）
*
*  例子：imgUrlFormat(url, "@64h_64w_1e_1c_2o", "/64");
*/

function imgUrlFormat (url, formatStrQ = '@64h_64w_1e_1c_2o', formatStrW = '/64') {
  if (/(img\.qlchat\.com)/.test(url)) {
    url = url.replace(/@.*/, '') + formatStrQ
  } else if (/(wx\.qlogo\.cn\/mmopen)/.test(url)) {
    url = url.replace(/(\/(0|132|64|96)$)/, formatStrW)
  };

  return url
};

/**
* 冒泡对话框形状的图片
* imageObj{x, y, w, h, rAll, bdWidth, bdColor, bgcolor, isLinear, linearColor }
* 该方法当时用于冒泡对话框形状的图片剪切，目前只应用于一个场景，其他场景未必适用
* @param {any}ctx      canvas 的 getContext('2d')
* @param {object}imageObj  图片显示样式设置
* {
  x:number,
  y:number,
  w:number,
  h:number,
  r:{
      r_top_right:number,
      r_bottom_right:number,
      r_bottom_left:number,
      r_top_left:number
  },
  bdWidth:number, //边框的宽度厚度
  bdColor:string, //边框的颜色
  bgcolor:string, //背景色（如果isLinear为true时，bgcolor作为渐变第一色）
  isLinear:boolean,  //是否渐变
  linearColor:string,  //渐变的第二色
  rAll:number}
*/
function headBgClipDialog (ctx, imageObj) {
  let { x, y, w, h, rAll, bdWidth, bdColor, bgcolor, isLinear, linearColor } = imageObj
  if (!rAll) { return false }
  ctx.moveTo(x + rAll, y)
  ctx.lineWidth = bdWidth
  ctx.strokeStyle = bdColor

  if (isLinear) {
    /* 指定渐变区域 */
    var grad = ctx.createLinearGradient(0, 0, 0, h)
    /* 指定几个颜色 */
    grad.addColorStop(0, bgcolor)
    grad.addColorStop(1, linearColor)
    /* 将这个渐变设置为fillStyle */
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = bgcolor
  }

  ctx.arcTo(x + w, y, x + w, y + h, rAll)
  ctx.arcTo(x + w, y + h, x + 20, y + h, rAll)
  ctx.arcTo(x + 18, y + h, x + 12, y + h - 5, rAll)
  ctx.arcTo(x + 8, y + h + 2, x, y + h, rAll)
  ctx.arcTo(x + 4, y + h - 4, x + 8, y + h - 10, rAll)
  ctx.arcTo(x + 5, y + h - 12, x + 5, y + h - 20, rAll)
  ctx.arcTo(x + 5, y + h - 20, x + 5, y, rAll)
  ctx.arcTo(x + 5, y, x + w + 5, y, rAll)

  ctx.stroke()
}

/**
* 加载特殊样式的数字图片
* @param {Array} numUrlArray  是自定义的图片链接，定制规则是 0~9是数字0~9的图片，10是小数点，11是￥的符号,（12是+号，13是－号,14是:号，目前这三个没有默认图，不想报错又想用就自己上传吧，）。
* 其他的符号的图片可后续优化添加。
* @param {any} imageProxyFunc 图片代理方法
* @param {function} cb 回调函数
* 加载特殊样式的数字图片
* loadNumImg( numUrlArray:[url:string],imageProxyFunc:any ,cb:any)
* 使用时，先loadNumImg,获取图片数组。
* 再使用showNumDraw方法画出数字图案。
*/
function loadNumImg (UrlArray, imageProxyFunc, cb) {
  var a = 0
  let numImfArray = []
  var numUrlArray = UrlArray.length > 0 ? UrlArray : [
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-0.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-1.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-2.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-3.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-4.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-5.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-6.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-7.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-8.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-9.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-dian.png',
    'https://img.qlchat.com/qlLive/liveCommon/coupon-card-num-money.png'
  ]
  for (var i = 0; i < numUrlArray.length; i++) {
    numImfArray[i] = new Image()
    numImfArray[i].crossOrigin = 'Anonymous'
    numImfArray[i].src = imageProxyFunc(numUrlArray[i])
    numImfArray[i].onload = function () {
      a++
      if (a >= numUrlArray.length) {
        typeof cb === 'function' && cb(numImfArray)
        return numImfArray
      }
    }
  }
}
/**
* 画特殊样式的数字
* @param {any} ctx         canvas 的 getContext('2d')
* @param {number} num      数字文本
* @param {any}numObj       显示样式设置
* {top:number,
  left:number,
  width:number,
  height:number }
* @param {Array} numImfArray Array     显示图片的数组
*    showNumDraw(ctx, num, numObj, numImfArray)
*    numObj{ top, left, width, height } , width, height 定制每个数字字符的图片显示的宽高
*    numImfArray 是应用的定制图片的数组
*    使用showNumDraw方法画出数字图案。
*/
function showNumDraw (ctx, num, numObj, numImfArray) {
  let numString = num.toString().split('')
  let numLen = numString.length
  let allWidth = numObj.width * numLen
  for (let index = 0; index < numLen; index++) {
    const element = numString[index]
    if (element === '.') {
      drawNum(ctx, 10, index, numImfArray, allWidth)
    } else if (element === '￥') {
      drawNum(ctx, 11, index, numImfArray, allWidth)
    } else if (element === '+') {
      drawNum(ctx, 12, index, numImfArray, allWidth)
    } else if (element === '-') {
      drawNum(ctx, 13, index, numImfArray, allWidth)
    } else if (element === ':') {
      drawNum(ctx, 14, index, numImfArray, allWidth)
    } else {
      drawNum(ctx, Number(element), index, numImfArray, allWidth)
    }
  }
}
function drawNum (ctx, n, p, numObj, numImfArray, allWidth) {
  ctx.drawImage(
    numImfArray[n],
    numObj.left + numObj.width * p - (allWidth / 2),
    numObj.top,
    numObj.width,
    numObj.height
  )
}

var imageProxyFunc = imageProxy('/api/wechat/image-proxy?url=') // 闭包函数

var canvas = null
var fontFamiry = '"苹方 常规","微软雅黑"'

/**
* 自定义海报
* @param {*} param0
*/
function drawCard ({
  bgUrl, // 海报背景
  cardWidth,
  cardHeight,
  contents = [],
  cb // 图片加载之后的回调
}) {
  if (!canvas) { // 先判断canvas是否存在
    
     = document.createElement('canvas')
  }

  if (bgUrl) { //  是否需要背景图
    contents.unshift({
      type: 'image',
      url: bgUrl,
      skipProxy: true, // 是否跨域
      style: {
        top: 0, // 背景图的位置
        left: 0,
        width: cardWidth, // 背景图的大小铺满整个canvas
        height: cardHeight
      }
    })
  }

  var ctx = canvas.getContext('2d') // 初始化canvas
  canvas.width = cardWidth || 640
  canvas.height = cardHeight || 1136
  ctx.fillStyle = '#fff' // 填充颜色为白色
  ctx.fillRect(0, 0, canvas.width, canvas.height) // fillRect(x，y，width，height) 方法绘制"已填充"的矩形。默认的填充颜色是黑,此处改为白色

  let i = 0
  const loop = () => { // 递归循环要画的每一项
    i += 1
    if (i < contents.length) {
      generate(ctx, contents[i], loop)
    } else {
      cb && cb(canvas.toDataURL('image/png', 0.9)) // 画完最后一项才将canvas转为图片，再执行回调
    }
  }
  generate(ctx, contents[i], loop) // 递归循环要画的每一项
}

function generate (ctx, content, cb) {
  if (!content) {
    cb && cb()
  }

  switch (content.type) {
    case 'image':
      loadImage(ctx, content, cb)
      break
    case 'singleText':
      drawText(
        ctx,
        content.text,
        content.style,
        fontFamiry
      )
      cb && cb()
      break
    case 'multiText':
      multiText(
        ctx,
        content.text,
        content.style
      )
      cb && cb()
      break
    case 'block':
      headBgClipRounded(
        ctx,
        content.style
      )
      cb && cb()
      break
    case 'singleTextSpace':
      drawTextSpace(
        ctx,
        content.text,
        content.style
      )
      cb && cb()
      break
    default:
      cb && cb()
      break
  }
}

/**
* 加载图片
* @param {any} cb
*/
function loadImage (ctx, image, cb) {
  drawStyleImage(
    ctx,
    image.url,
    image.style,
    image.skipProxy ? null : imageProxyFunc,
    () => {
      cb()
    }
  )
}

export {
  showNumDraw,
  loadNumImg,
  headBgClipDialog,
  imgUrlFormat,
  drawStyleImage,
  imageProxy,
  drawImage,
  headBgClipRounded,
  drawTextSpace,
  drawText,
  timeParse,
  multiText,
  drawCard
}
