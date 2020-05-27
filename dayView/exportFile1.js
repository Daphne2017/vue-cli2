// 用户管理导出
if (btn.action === 'exportUser') {
    this.$http({
    url: API_GATEWAY + '/api/users/export',
    method: 'POST',
    headers: {
    'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')),
    'Accept': 'application/json',
    'X-TenantId': JSON.parse(window.sessionStorage.getItem('user')).tenantId,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
    },
    responseType: 'arraybuffer' // 返回buffer二进制数据
    }).then(function (response) {
    var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    // blob(size,type) Blob构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型
    var objectUrl = URL.createObjectURL(blob)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('style', 'display:none')
    a.setAttribute('href', objectUrl)
    var filename = '用户信息.xlsx'
    a.setAttribute('download', filename)
    a.click()
    URL.revokeObjectURL(objectUrl)
    })
    return
    }
    
    
    // 用户管理下载模板
    if (btn.action === 'downloadFile') {
    this.$http({
    url: API_GATEWAY + '/api/users/downloadFile',
    method: 'POST',
    headers: {
    'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')),
    'Accept': 'application/json',
    'X-TenantId': JSON.parse(window.sessionStorage.getItem('user')).tenantId,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
    },
    responseType: 'arraybuffer'
    }).then(function (response) {
    var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    var objectUrl = URL.createObjectURL(blob)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('style', 'display:none')
    a.setAttribute('href', objectUrl)
    var filename = '用户导入数据模板.xlsx'
    a.setAttribute('download', filename)
    a.click()
    URL.revokeObjectURL(objectUrl)
    })
    return
    }
    ————————————————
    版权声明：本文为CSDN博主「fj101229」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    原文链接：https://blog.csdn.net/fj101229/java/article/details/79742706

    前后端分离利用Blob实现导出excel



传统jsp项目中实现excel的导出

// 利用后端服务返回输出流，添加header,设置content-type
```
response.addHeader("Content-Disposition", "attachment;filename="+fileName)
response.setContentType("application/vnd.ms-excel;charset=UTF-8");

## 前后端分离导出
 js对象Blob能存储大量的二进制数据，利用这个特性将后端服务返回的流存储到blob
 ```
import axios from 'axios'
export function exportExcel(url,param,fileName) {
axios({
 method: "GET",
 url: url,
 params: param || {},
 responseType: 'blob'
}).then(r => {
 let blob = new Blob([r.data], {type: 'application/vnd.ms-excel'});
 window.URL = window.URL || window.webkitURL;
 let href = URL.createObjectURL(blob);
 let downA = document.createElement("a");
 downA.href =  href;//
 downA.download = fileName;
 downA.click();
 window.URL.revokeObjectURL(href);
})
}
 ```

最后通过URL.createObjectURL方法把blob转成了肉眼可见的js和HTML中可以看到的Blob URL如下

blob:http://sheetjs.com/f999f57f-b79f-4293-a317-3bbf6ea58788

作者：呼唤远方
链接：http://www.imooc.com/article/42424
```
Blob 格式 Excel 文件下载export 
const excelDownLoad = (url, data = {}) => {
    axios({
      method: 'post',
      url,
      data,
      responseType: 'arraybuffer'
    })
      .then(res => {
        // res.data 是一个 blob 流格式
        const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
        const downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = res.headers['content-disposition'].split('=')[1]
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      })
  }