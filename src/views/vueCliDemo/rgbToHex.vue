<template>
  <div>
    <!-- 图片展示  -->
    <div class="img-box">
      <div v-for="(item, index) in imgList" :key="index">
        <img :src="item.url" alt="" @mouseover="showImgOtptionFun(index)">
        <div class="mask-layer" v-if="item.show" @mouseout="hideImgOtptionFun(index)" @mouseover="showImgOtptionFun(index)">
            <span><i class="el-icon-zoom-in img-icon" style="padding-right:10px" @click="showBigImg(item.url)"></i></span>
            <span v-if="showType === 0"><i class="el-icon-delete img-icon" @click="deleteImgFun(index)"></i></span>
        </div>
      </div>
    </div>
    <!--  上传组件  不添加 :list-type="'picture-card'"，自定义预览图片-->

    <el-upload
      class="upload-drag"
      v-if="showType === 0"
      :style="{ 'display' : isHidden }"
      drag
      multiple
      action=""
      :limit="3"
      :on-success="picSuccess2"
      :on-error="picError"
      accept="image/png, image/jpeg, image/jpg"
      :file-list="imgList"
      :http-request="picUpload"
       :data="extraData"
      :show-file-list="false"
      :on-exceed="overFileTipFun"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">(file =>dataURL实际上就是base64Url)</div>
    </el-upload>
    <!--   图片弹窗    -->
    <el-dialog :append-to-body="true" center :visible.sync="imgShowVisible" top="3vh">
      <div>
        <img style="width:100%" :src="imageBigUrl" alt="">
      </div>
    </el-dialog>
        <el-upload
      class="upload-drag"
      action=""
      :limit="3"
      :on-success="picSuccess1"
      :on-error="picError"
      accept="image/png, image/jpeg, image/jpg"
      :file-list="imgList"
      :http-request="picUpload"
       :data="extraData"
      :show-file-list="false"
      :on-exceed="overFileTipFun"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text"> (file =>blob：url/ObjectURL)</div>
    </el-upload>
    <el-button type="primary" @click="userCanvasUrltoDtaURL()">使用canvas将图片url转成dataUrl（base64）</el-button>
  </div>
</template>
<script>
// import { uploadImg } from '@/api/teach/batchUploadHomework'
export default {
  name: 'drag',
  props: {
    imgList: {// 图片url =>  [{ url: '....', show: false }]
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    showType: {// 0为上传状态，其余为查看图片状态
      type: Number,
      required: false,
      default: 0
    }
  },
  model: {
    prop: 'imgList',
    event: 'getUrl'
  },
  data () {
    return {
      imageBigUrl: '',
      imgShowVisible: false,
      isHidden: 'inline-block',
      extraData: {
        name: 'yys',
        age: 25
      }
    }
  },
  mounted () {
  },

  watch: {
    imgList (val) {
      val.length >= 3 ? this.isHidden = 'none' : this.isHidden = 'inline-block'
      this.$emit('getImgUrl', val)
    },
    showType (val) {
      this.imgList.length >= 3 ? this.isHidden = 'none' : this.isHidden = 'inline-block'
    }
  },
  methods: {
    // 图片限制
    checkImg (file) {
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('上传的图片大小不能超过4M')
      }
      return isLt4M
    },
    // 图片上传
    picUpload (item) { // 注意如果picUpload函数是async函数的话，那么就会自动触发onSuccess函数，如果手动再触发就会调用两次
      const formData = new FormData()
      formData.append('file', item.file)
      if (!this.checkImg(item.file)) {
        item.onError()
        return
      }
      console.log('file', item) // item包含上传时附带的额外参数,通过item.data获取
      item.onSuccess(item.data)
    },
    /*
      window.URL.createObjectURL方法的参数即可以是file，也可以是blob
      file => blob：url/ObjectURL
     */
    picSuccess1 (extraData, file, fileList) { // 如果没有手动给onSuccess传参数，那么extraData的值为undefined，可手动传附带的额外参数
      console.log('extraData', extraData) // 可打印extraData的值
      console.log('file', file) // 也可以在file.response中打印extraData的值
      console.log('fileList', fileList)
      console.log('file.url', file.url) // 如果没有设置:list-type="'picture-card'"，那么file.url的值为undefined，可以手动生成文件的dataUrl即blob：url/ObjectURL
      console.log('')
      let img = new Image()
      img.onload = function (e) { // onload事件，在图片加载完成后立即执行
        window.URL.revokeObjectURL(this.src) // 清除释放
      }
      img.src = window.URL.createObjectURL(file.raw) // 生成文件的blob：url/ObjectURL
      this.imgList.push({ url: img.src, show: false })
      console.log('手动生成的blobUrl/ObjectURL:', img.src)
      this.$message({
        message: '图片添加成功',
        type: 'success'
      })
    },
    /*
     new FileReader()
     reader.readAsDataURL
    file => dataURL实际上就是base64Url
     */
    picSuccess2 (extraData, file, fileList) { // 如果没有手动给onSuccess传参数，那么extraData的值为undefined，可手动传附带的额外参数
      console.log('extraData', extraData) // 可打印extraData的值
      console.log('file', file) // 也可以在file.response中打印extraData的值
      console.log('fileList', fileList)
      console.log('file.url', file.url) // 如果没有设置:list-type="'picture-card'"，那么file.url的值为undefined，可以手动生成文件的dataUrl即blob：url
      var reader = new FileReader()
      reader.onload = (ev) => { // 文件读取完成后立即执行
        let dataURL = ev.target.result// dataURL;
        console.log('手动生成的dataUrl:', dataURL)
        this.imgList.push({ url: dataURL, show: false }) // dataURL实际上就是base64Url
      }
      reader.readAsDataURL(file.raw)// file->dataURl
      this.$message({
        message: '图片添加成功',
        type: 'success'
      })
    },
    picError () {
      this.$message({
        message: '图片添加失败',
        type: 'error'
      })
    },
    /*
     canvas.toDataURL
      url => dataURL实际上就是base64Url
     */
    async userCanvasUrltoDtaURL () {
      let Img = new Image()
      let dataURL = ''
      Img.crossOrigin = 'anonymous'
      Img.onload = () => { // 确保图片完整获取
        const canvas = document.createElement('canvas') // 创建canvas元素
        canvas.width = Img.width //
        canvas.height = Img.height
        canvas.getContext('2d').drawImage(Img, 0, 0, Img.width, Img.height) // 绘制canvas
        dataURL = canvas.toDataURL('image/jpeg', 1.0) // 转换为base64 1.0为图片的质量
        console.log('使用Canvas转的base64', dataURL)
        // 得到了dataURL之后将其转为blob
        const blob = this.convertBase64UrlToBlob(dataURL)
        // blob->file
        let files = new window.File([blob], 'blob转file', { type: 'image/jpeg' })
        console.log('blob->file:', files)
      }
      Img.src = `http://ab-static.huoxingtang.com/admin/uploaded-files/alpha/uploadUserAvator/2020-08-25T10-37-42-f48f0355-%E4%B8%8B%E8%BD%BD%20(3).png?v=${new Date()}` // 避免浏览器缓存导致执行toDataURL的时候出现跨域
    },
    /**
     * .dataURL->blob:
      */
    convertBase64UrlToBlob (base64Url) {
      const bytes = window.atob(base64Url.split(',')[1])
      const array = []
      for (let i = 0; i < bytes.length; i++) {
        array.push(bytes.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], { type: 'image/jpeg' }) // Uint8Array 数组类型表示一个8位无符号整型数组
    },
    /**
     * .dataURL->blob:
      */
    dataURLtoBlob (dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    /**
     *  blob->file
      */
    blobToFile (blob) {
      let files = new window.File([blob], 'blob转file', { type: 'image/jpeg' })
      console.log('blob->file:', files)
    },

    overFileTipFun () {
      this.$message({
        message: '最多上传3张图片'
      })
    },
    // 图片操作蒙层
    showImgOtptionFun (index) {
      this.imgList[index].show = true
    },
    hideImgOtptionFun (index) {
      this.imgList[index].show = false
    },
    // 图片放大
    showBigImg (url) {
      this.imageBigUrl = url
      this.imgShowVisible = true
    },
    // 图片移除
    deleteImgFun (index) {
      this.imgList.splice(index, 1)
      this.$message({
        message: '图片移除成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .upload-drag{
    display: inline-block;
  }
  .upload-drag /deep/ .el-upload-dragger{
    width: 450px;
    height: 200px;
  }
  .upload-drag /deep/ .el-upload-dragger .el-icon-upload{
    line-height: 100px
  }
  .img-box{
    display: inline-block;
  }
  .img-box > div{
    position: relative;
    display: inline-block;
  }
  .img-box > div > img{
    display: inline-block;
    width: 200px;
    height: 200px;
    margin-left: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
  .img-icon{
    color:white;
    font-size:22px;
    cursor: pointer;
  }
  .mask-layer{
    position: absolute;
    display: inline-block;
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    z-index: 10;
    line-height: 200px;
    text-align: center;
    top: 0;
    left: 10px;
  }
</style>
