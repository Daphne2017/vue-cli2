import request from '@/utils/request'
// 获取微信配置信息
export function getWechatInfo (data) {
  return request({
    url: '/proxymsg',
    method: 'post',
    reqDesction: 'GetWxSubConfigReq',
    resDesction: 'GetWxSubConfigRes',
    funcName: 'GetWxSubConfig',
    serverName: 'system.SystemExtObj',
    data,
  })
}
