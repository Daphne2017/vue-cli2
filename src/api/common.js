/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-31 19:28:26
 * @LastEditTime: 2019-08-26 17:42:29
 * @LastEditors: Please set LastEditors
 */
// 配置域名
let prefixUrl

if (process.env.NODE_ENV === 'production') {
  // 正式环境
  prefixUrl = '/djyuatzwwx/api' // UAT
} else {
  // 本地环境接口前缀
  prefixUrl = '/api' // SIT
}
export {prefixUrl}
