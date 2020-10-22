
<template>
  <div class="el-wrapper-box">
    <div class="game-overview-wrap">
      <div class="left-count">
        <div class="item normal-blue">
          <span>显示中：</span>
          <span>{{ displayNum }}</span>
        </div>
        <div class="item normal-red">
          <span>已隐藏：</span>
          <span>{{ unDisplayNum }}</span>
        </div>
        <div class="item normal-gray">
          <span>总数：</span>
          <span>{{ Number(displayNum) + Number(unDisplayNum) }}</span>
        </div>
      </div>
      <div class="right-sort">
        按权重排序显示
      </div>

    </div>
    <common-table
      ref="albumTable"
      key="albumTableKey"
      border
      :data-url="albumListApi"
      :column="albumColumn"
      :pagination="albumPagination"
      :filter-btn="albumFilterBtn"
      @searchData="getTableData"
    >
      <template #tableBtn>
        <el-button type="success" icon="el-icon-plus" @click="addNewAlbum('new')">新增</el-button>
      </template>
      <template #albumCover="{ scope }">
        <el-image class="albumCover-img" :src="scope.row.albumCover" :preview-src-list="[scope.row.albumCover]" />
      </template>
      <template #createdAt="{ scope }">
        {{ scope.row.createdAt && parseTime(scope.row.createdAt) }}
      </template>
      <template #weight="{scope:{row}}">
        <el-input
          v-model.number="row.weight"
          type="number"
          min="1"
          :clearable="true"
          @keyup.native="positiveInteger(row)"
          @blur="updateWeight(row)"
          @focus="currentWeight = Object.assign(row).weight"
        />
      </template>
      <template #albumType="{ scope }">
        {{ albumTypeObj[scope.row.albumType] }}
      </template>
      <template #displayStatus="{ scope: { row }}">
        {{ albumStatusObj[row.displayStatus] }}
      </template>
      <template #operate="{  scope: { row, row :{ displayStatus}} }">
        <div class="operate-btn-wrap">
          <el-button type="info" size="small" @click="addNewAlbum('edit',row)">编辑</el-button>
          <el-button v-if="displayStatus === 0" type="primary" size="small" @click="OnOffShelf('on',row.id, 1)">上架</el-button>
          <el-button v-if="displayStatus === 1" type="primary" size="small" @click="OnOffShelf('off',row.id, 0)">下架</el-button>
        </div>

      </template>
    </common-table>
    <!-- 新增编辑游戏弹窗 -->
    <el-dialog
      class="add-games-dialog"
      top="4vh"
      :center="true"
      :title="albumDialogType === 'new' ? '新增专辑' : '编辑专辑'"
      width="50%"
      :visible.sync="showGameDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <commonForm
        v-if="showGameDialog"
        ref="addAlbumForm"
        v-loading="formLoading"
        :form-fields="albumFormFields"
        :form-data="albumFormData"
        :form-rules="albumFormAttr.formRules"
        :form-label-width="albumFormAttr.formLabelWidth"
        @addImgTagBtn="addAssociateGame"
        @confirm="confirm"
        @cancel="showGameDialog = false"
        @selectalbumType="selectalbumType"
      >
        <template #sectionDataSlot>
          <div>当前共{{ sectionTableData.length }}项区间</div>
          <p v-for="item in sectionTableData" :key="item.id" class="sectionItem">胜率{{ item.sectionStart }}%-{{ item.sectionEnd }}%</p>
          <a class="normal-blue" @click="editSection"> 点击编辑 </a>
        </template>
      </commonForm>

    </el-dialog>
    <!-- 添加关联游戏弹框 -->
    <el-dialog class="add-tag-dialog" title="添加关联游戏" width="50%" :visible.sync="showTagDialog" @close="closeTagDialog">
      <div v-if="!!selectTagData.length" class="image-tag-fields-box">
        <div v-for="tagItem in selectTagData" :key="tagItem.id" class="img-item-wrap">
          <i class="el-icon-error delete-icon" @click="tagClose(tagItem.id,'gameTag')" />
          <div class="img-item" @click="imageTagPreview(tagItem)"><img :src="tagItem.url" alt="暂无图片"></div>
          <span>{{ tagItem.name }}</span>
        </div>
      </div>
      <common-table
        ref="tagTable"
        key="tagTableKey"
        border
        :data-url="gameMangementListApi"
        :column="tagColumn"
        :pagination="tagPagination"
        :filter-btn="tagFilterBtn"
      >

        <template #gameIcon="{ scope }">
          <el-image class="gameIcon-img" :src="scope.row.gameIcon" :preview-src-list="[scope.row.gameIcon]" />
        </template>
        <template #gameType="{ scope }">
          {{ gameTypeObj[scope.row.gameType] }}
        </template>
        <template #gameTagData="{ scope }">
          {{ handleLabelAssociation(scope.row.gameTagData) }}
        </template>
        <template #putStatus="{ scope: { row }}">
          <span :class="{'normal-blue': row.putStatus === 1,'normal-gray': row.putStatus === 0}">{{ gameStatusObj[row.putStatus] }}</span>
        </template>
        <template #operate="{  scope: { row } }">
          <div class="operate-btn-wrap">
            <span v-if="!noSelectBtn(row) && selectBtn(row)" class="normal-gray">已加入本专辑</span>
            <a v-if="!noSelectBtn(row) && !selectBtn(row)" class="normal-blue" @click="joinAlbum(row)">加入</a>
            <span v-if="noSelectBtn(row)" class="normal-gray">不可选取</span>
          </div>

        </template>
      </common-table>
    </el-dialog>
    <!-- 添加区间 -->
    <el-dialog class="add-section-dialog" title="匹配区间编辑" width="50%" :visible.sync="showSectionDialog">

      <common-table
        ref="sectionTable"
        key="sectionTablekey"
        border
        :column="sectionColumn"
        :static-data="sectionTableData"
        :pagination="sectionPagination"
      >
        <template #tableBtn>
          <el-form ref="sectionForm" :model="sectionForm">
            <el-form-item prop="section">
              <el-input v-model.number="sectionForm.sectionStart" type="number" min="0" max="100" @keyup.native="onlyNumber('sectionForm','sectionStart',$event)" />&nbsp;~&nbsp;<el-input v-model.number="sectionForm.sectionEnd" type="number" min="0" max="100" @keyup.native="onlyNumber('sectionForm','sectionEnd',$event)" /></el-form-item>
          </el-form>
          <el-button v-if="!sectionForm.num" type="success addSection" icon="el-icon-plus" size="medium" @click="addItem">新增区间</el-button>
          <el-button v-else type="success editSection" icon="el-icon-plus" size="medium" @click="sureBtn">确认修改</el-button>

        </template>
        <template #section="{  scope: { row } }">
          <div>胜率{{ row.sectionStart }}% ~ {{ row.sectionEnd }}%</div>
        </template>
        <template #operate="{  scope: { row, row :{ num }} }">
          <div class="operate-btn-wrap">
            <el-button v-if="sectionForm.num !== row.num" size="small" type="info" @click="editItem(row)">编辑</el-button>
            <el-button v-if="sectionForm.num == row.num" size="small" type="worn" @click="cancelEdit()">取消</el-button>
            <el-button size="small" type="worn" @click="deleteItem(num)">删除</el-button>
          </div>

        </template>
      </common-table>
    </el-dialog>
    <!-- 图片标签预览 -->
    <el-dialog :visible.sync="imgTagDialogVisible" top="7vh" :append-to-body="true">
      <img width="100%" :src="imgTagUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import commonTable from '@/components/CommonTable'
import commonForm from '@/components/CommonForm'
import { parseTime } from '@/utils'
import { addSubmitGameApi, editSubmitGameApi, gameMangementListApi, getAlbumRelatedTagApi, uploadGameIconApi, updateDisplayStatusApi, updateWeightApi, albumListApi } from '@/api/gameMangement/albumMangement'
import {
  albumFormFields,
  albumFormAttr,
  albumColumn,
  albumPagination,
  albumFilterBtn,
  albumNewFormData,
  albumFormData,
  sectionColumn,
  sectionTableData,
  initSectionTableData,
  sectionPagination,
  sectionForm,
  initSectionForm,
  albumTypeObj,
  albumStatusObj,

} from './gameAlbumOption'
import { tagColumn, tagPagination, tagFilterBtn } from './albumTagListOption.js'
import {
  gameTypeObj,
  gameStatusObj,
} from '../gameLibrary/gameLibraryOption'
import {

} from '@/api/operateMangement'
export default {
  name: 'GameLibrary',
  components: {
    commonTable,
    commonForm,
  },
  data() {
    const validateSection = (rule, value, callback) => {
      if (this.sectionTableData.length === 0 && this.albumFormData.albumType === 1) { // 只有对战式的专辑才需要检验是否已添加区间
        callback(new Error('请添加区间'))
      } else {
        callback()
      }
    }
    const validateGame = (rule, value, callback) => {
      const item = this._.find(this.albumFormFields, val => val.prop === 'gameData')
      if (item.tagData.length === 0) {
        callback(new Error('请选择关联的游戏'))
      } else {
        callback()
      }
    }
    return {
      parseTime,
      gameTypeObj,
      gameStatusObj,
      albumTypeObj,
      albumStatusObj,
      albumListApi,
      gameMangementListApi,
      albumColumn,
      albumPagination,
      albumFilterBtn,
      albumFormFields,
      albumFormAttr,
      albumNewFormData,
      albumFormData,
      sortFlag: false,
      showGameDialog: false,
      showTagDialog: false,
      albumDialogType: 'new',
      tagColumn,
      sectionColumn,
      sectionTableData,
      initSectionTableData,
      sectionPagination,
      showSectionDialog: false,
      tagPagination,
      tagFilterBtn,
      selectTagData: [],
      upLoadImg: '',
      imgTagUrl: '',
      imgTagDialogVisible: false,
      sectionForm,
      initSectionForm,
      sectionStartArr: [],
      sectionEndArr: [],
      editSectionStatus: false,
      validateSection,
      validateGame,
      unDisplayNum: 0,
      displayNum: 0,
      gameDataFields: null, // 关联游戏
      formLoading: false, // 提交表单的loading状态
      currentWeight: '', // 当前权重值

    }
  },
  created() {
    this.setOption()
    this.albumFormAttr.formRules.gameData[0].validator = this.validateGame
    this.albumFormAttr.formRules.sectionData[0].validator = this.validateSection
  },
  mounted() {
    this.gameDataFields = this._.find(this.albumFormFields, val => val.prop === 'gameData')
  },
  methods: {
    /**  初始化上传事件  */
    setOption() {
      const uploadFields = this._.find(this.albumFormFields, val => val.prop === 'albumCoverUpload')
      Object.assign(uploadFields, {
        httpRequest: this.upload,
        onRemove: this.removeImg,
        onSuccess: this.successUpload,
        onError: this.errorUpload,
        onExceed: this.exceedUpload,
      })
    },
    /**  上传图片  */
    upload(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      if (!this.checkImg(item.file)) {
        item.onError()
        return
      }
      item.onSuccess()
      this.upLoadImg = formData
    },
    /**  图片大小限制  */
    checkImg(file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传的图片大小不能超过5M')
      }
      return isLt5M
    },
    /**  超出上传图片数量  */
    exceedUpload() {
      this.$message({
        message: '只能上传一张图片',
        type: 'info',
      })
    },
    /**  删除图片  */
    removeImg(file) {
      this.albumFormData.albumCoverUpload = []
      this.$message({
        message: '图片删除成功',
        type: 'success',
      })
    },

    /**  上传失败  */
    errorUpload() {
      this.albumFormData.albumCoverUpload = []
    },
    /**  上传成功  */
    successUpload(response, file, fileList) {
      this.albumFormData.albumCoverUpload = [{ url: file.url }]
    },
    /**  表单提交  */
    async confirm() {
      if (this.upLoadImg) { // 上传图片
        const res = await uploadGameIconApi(this.upLoadImg)
        this.albumFormData.albumCover = res.data.url
        this.upLoadImg = ''
      }
      this.albumFormData.gameData = this.gameDataFields.tagData.map(item => item.id) // 专辑关联游戏
      this.albumFormData.sectionData = this.sectionTableData.map(item => {
        delete item.id
        return item
      }) // 专辑关联标签
      this.formLoading = true
      if (this.albumFormData.id) { // 专辑更新
        await editSubmitGameApi(this.albumFormData.id, this.albumFormData)
      } else { // 新增
        delete this.albumFormData.id
        await addSubmitGameApi(this.albumFormData)
      }
      this.formLoading = false
      this.$message.success(`操作成功~`)
      this.showGameDialog = false
      this.$refs.albumTable.search(1) // 刷新表格
    },
    /**  获取上下架专辑总数  */
    getTableData(res) {
      this.unDisplayNum = res.data.unDisplayNum
      this.displayNum = res.data.displayNum
    },
    /**  列表回显关联标签  */
    handleLabelAssociation(data = []) {
      return data.map(item => item.name).join(',')
    },
    /**   改变专辑类型1:对战式，2非对战式 */
    selectalbumType(val, type) {
      const cusTomFields = this._.find(this.albumFormFields, val => val.prop === 'sectionData')
      cusTomFields.hidden = val !== 1 // 非对战式专辑隐藏区间
      !type && (this.gameDataFields.tagData = []) // 置空关联游戏
    },
    /**   打开编辑区间  */
    editSection() {
      this.showSectionDialog = true
    },
    /**    判断已有区间是否存在交集  */
    isOverLap() {
      const { num, sectionStart, sectionEnd } = this.sectionForm
      let overlapFlag = false
      if (sectionStart === '') {
        this.$message.warning('请输入开始区间值')
        overlapFlag = true
        return overlapFlag
      }
      if (sectionEnd === '') {
        this.$message.warning('请输入结束区间值')
        overlapFlag = true
        return overlapFlag
      }

      if (sectionEnd < sectionStart) {
        this.$message.warning('结束区间不能小于开始区间')
        overlapFlag = true
        return overlapFlag
      }
      //  构造区间比较数组
      const sectionStartArr = []
      const sectionEndArr = []
      for (const item of this.sectionTableData) {
        if (item.num === num) { // 针对修改区间值
          sectionStartArr.push(sectionStart)
          sectionEndArr.push(sectionEnd)
        } else {
          sectionStartArr.push(item.sectionStart)
          sectionEndArr.push(item.sectionEnd)
        }
      }
      if (!num) { // 新增区间
        sectionStartArr.push(sectionStart)
        sectionEndArr.push(sectionEnd)
      }
      // 先排序后比较
      sectionStartArr.sort((item1, item2) => item1 - item2)
      sectionEndArr.sort((item1, item2) => item1 - item2)

      for (let i = 1; i < sectionStartArr.length; i++) {
        if (sectionStartArr[i] <= sectionEndArr[i - 1]) { // 如果开始区间小于等于结束区间
          this.$message.warning('已与现有区间重叠，请先调整或删除~')
          overlapFlag = true
          break
        }
      }
      return overlapFlag
    },
    /** 编辑专辑匹配区间 */
    editItem(row) {
      this.sectionForm = JSON.parse(JSON.stringify(row))
      this.editSectionStatus = true
    },
    /** 新增专辑匹配区间条目  */
    addItem() {
      const { sectionStart, sectionEnd } = this.sectionForm
      const overlapFlag = this.isOverLap() // 新增与现有是否重叠
      if (overlapFlag) return
      this.sectionTableData.push({
        num: this.sectionTableData.length + 1,
        sectionStart,
        sectionEnd,
      })
    },
    /** 确认修改区间条目  */
    sureBtn() {
      const { num, sectionStart, sectionEnd } = this.sectionForm
      const overlapFlag = this.isOverLap()
      if (overlapFlag) return
      this.sectionTableData.forEach(item => { // 更新区间值
        if (item.num === num) {
          item.sectionStart = sectionStart
          item.sectionEnd = sectionEnd
        }
      })
      this.sectionForm = this.initSectionForm
      this.editSectionStatus = false
    },
    /* 取消编辑 */
    cancelEdit() {
      this.sectionForm = this.initSectionForm
    },
    /* 校验输入区间的值 */
    onlyNumber(obj, key, e) {
      e.target.value = e.target.value.replace(/\D+/, '')
      if (e.target.value > 100) {
        this[obj][key] = 100
      }
    },
    positiveInteger(row) {
      row.weight = Number(`${row.weight}`.replace(/\D+/g, ''))
    },
    /** 删除区间条目  */
    deleteItem(num) {
      const curIndex = this.sectionTableData.findIndex(item => item.num === num)
      this.sectionTableData.splice(curIndex, 1)
      this.sectionForm.num = ''
    },
    /** 新增/编辑专辑  */
    async addNewAlbum(type, row) {
      this.showGameDialog = true
      this.albumDialogType = type
      this.upLoadImg = ''
      const fields = this._.find(this.albumFormFields, val => val.prop === 'albumType')
      fields.disabled = type !== 'new'
      if (type === 'new') {
        this.albumFormData = JSON.parse(JSON.stringify(this.albumNewFormData)) // 新增表单初始化
        this.gameDataFields.tagData = [] // 置空关联游戏
        this.sectionForm = this.initSectionForm
        this.sectionTableData = this.initSectionTableData// 初始化区间匹配
        return
      }
      this.formLoading = true
      await this.getAlbumGamesTag(row.id) // 编辑回显专辑关联游戏
      const { albumName, weight, albumCover, albumType, displayStatus, id } = row
      this.selectalbumType(albumType, 'notResetGame')
      this.albumFormData['albumCoverUpload'] = [{ url: albumCover }] // 回显图片
      this.albumFormData = { ...this.albumFormData, albumName, weight, albumCover, albumType, displayStatus, id }
      this.formLoading = false
    },
    /**  更新专辑权重  */
    async updateWeight(row) {
      if (Number(this.currentWeight) === Number(row.weight)) return // 权重没修改就不请求
      await updateWeightApi(row.id, { weight: row.weight })
      this.$message.success(`操作成功~`)
      this.$refs.albumTable.search(1)
    },
    /**  专辑添加关联游戏弹框  */
    addAssociateGame(relateTagData) {
      if (!this.albumFormData.albumType) {
        this.$message.warning('请先选择专辑形态~')
        return false
      }
      this.selectTagData = JSON.parse(JSON.stringify(relateTagData))
      this.showTagDialog = true
      this.$refs.tagTable && this.$refs.tagTable.search(1)
    },
    /**  专辑添加关联游戏  */
    joinAlbum(row) {
      const isSelect = this.selectTagData.some(item => {
        item.id === row.id
      })
      if (isSelect) return
      row.url = row.gameIcon
      row.name = row.gameName
      this.selectTagData.push(row)
    },
    /**  专辑添加关联游戏弹框关闭前回调  */
    closeTagDialog() {
      this.gameDataFields.tagData = [...this.selectTagData]
    },
    /**   标签关闭事件  */
    tagClose(id) {
      const curIndex = this.selectTagData.findIndex((tagItem, index) => tagItem.id === id)
      this.selectTagData.splice(curIndex, 1)
    },

    /**  获取已关联的游戏  */
    async getAlbumGamesTag(id) {
      const res = await getAlbumRelatedTagApi(id)
      // 回显关联游戏
      this.gameDataFields.tagData = res.data.gameData.map(item => {
        return {
          id: item.id,
          name: item.gameName,
          url: item.gameIcon,
        }
      })
      // 设置关联区间列表
      this.sectionTableData = res.data.sectionData
    },
    /**   专辑上下架  */
    async OnOffShelf(type, id, displayStatus) {
      await updateDisplayStatusApi(id, { displayStatus })
      this.$message.success(`操作成功~`)
      this.$refs.albumTable.search(1) // 刷新表格
    },
    /**   处理操作按钮状态  */
    selectBtn(row) {
      const isSelect = this.selectTagData.some(item => item.id === row.id)
      return isSelect
    },
    /**   游戏类型是否可选取  */
    noSelectBtn(row) {
      // 对战类专辑只能关联对战类游戏
      const albumType = Number(this.albumFormData.albumType)
      const gameType = Number(row && row.gameType)
      return albumType === 1 ? gameType !== 1 : gameType === 1
    },
    /**   图片标签预览  */
    imageTagPreview(tagItem) {
      this.imgTagUrl = tagItem.url
      this.imgTagDialogVisible = true
    },
  },
}
</script>

<style lang='scss' scoped>
.el-wrapper-box {
  /deep/ .game-overview-wrap{
    display: flex;
    font-size: 14px;
    color: #606266;
    margin-bottom: 20px;
    font-weight: normal;
    justify-content: space-between;
    .left-count{
       display: flex;
      .item{
      margin-right: 15px;
      }
    }
    .right-sort{
      display: flex;
      .isActive{
        background-color: #1890ff;
        border-color: #1890ff;
        color: #ffffff;
      }
    }

  }
  .add-games-dialog{
    /deep/.sectionItem{
      margin: 0;
      padding: 0;
    }
  }
  .add-section-dialog{
    .sectionEditStatus{
      display: flex;
      align-items: center;
    }

    /deep/ .filter-box{
      margin-bottom: 20px;
      .btn-box{
        display: flex;
        /deep/ .el-form-item{
          margin-bottom: 0px;
          .el-form-item__content{
            display:flex;
            .el-input{
              width: 80px;
            }
          }
        }
        /deep/ .addSection,.editSection{
          margin-left: 15px;
        }
      }
    }
  }
  .select-tag-list{
    display: flex;
    flex-wrap: wrap;
    /deep/.el-tag{
      margin: 0 10px 10px 0;
      &.add-tag-btn{
        color: #606266;
        background: #ffffff;
        border-color: #DCDFE6;
      }
    }
  }
}
</style>
