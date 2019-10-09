/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-31 19:28:26
 * @LastEditTime: 2019-09-02 11:05:47
 * @LastEditors: Please set LastEditors
 */
import { prefixUrl } from '@/api/common'
export default {
  data () {
    return {
      // DICTIONARY: JSON.parse(localStorage.getItem('baseData'))
    }
  },
  methods: {
    jumpHome () {
      console.log('prefixUrl', prefixUrl)
    }
  },
  // 共享过滤器
  filters: {
    replyStatus: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.replyStatusDisplay
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) {
          if (arr[i].label === '未报到') {
            arr[i].label = '待报到'
          }
          return arr[i].label
        }
      }
    },
    userType: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).userType
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    personSex: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.personSex
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    nation: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.nation
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    transferIn: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.transferOutIn[0].children
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    innerParty: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.innerParty
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    politicalF: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.politicalF
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value * 1 === value * 1) return arr[i].label
      }
    },
    originalJob: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.originalJob
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    flowRange: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.flowRange
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    flowType: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.flowType
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    flowReason: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.flowReason
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    },
    registerTy: value => {
      let array = JSON.parse(localStorage.getItem('baseData')).dictMap.registerTy
      let newArr = []
      arrAnalysis(array, newArr)
      function arrAnalysis (array, newArr) {
        for (let i = 0; i < array.length; i++) {
          newArr.push({
            label: array[i].label,
            value: array[i].value
          })
          if (array[i].children && array[i].children.length) {
            arrAnalysis(array[i].children, newArr)
          }
        }
      }
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].value === value) return newArr[i].label
      }
    },
    trainType: value => {
      let arr = JSON.parse(localStorage.getItem('baseData')).dictMap.trainType
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === value) return arr[i].label
      }
    }
  }
}
