export const albumColumn = [
  {
    prop: 'weight',
    label: '排序权重',
  },
  {
    prop: 'id',
    label: '专辑ID',
  },
  {
    prop: 'albumName',
    label: '专辑名称',
  },
  {
    prop: 'albumCover',
    label: '专辑封面',
  },
  {
    prop: 'albumType',
    label: '专辑形态',
    formPropVal: 0,
    filterOption: {
      type: 'select',
      label: '专辑形态',
      prop: 'albumType',
      placeholder: '请选择',
      disabled: false,
      multiple: false,
      filterable: true,
      clearable: false,
      selectData: [
        { label: '全部', value: 0 }, { label: '对战式', value: 1 }, { label: '非对战式', value: 2 },
      ],
    },
  },
  {
    prop: 'relatedGameCount',
    label: '关联游戏数',
  },
  {
    prop: 'createdAt',
    label: '创建时间',
  },
  {
    prop: 'displayStatus',
    label: '状态',
    formPropVal: -1,
    filterOption: {
      type: 'select',
      label: '状态',
      prop: 'displayStatus',
      placeholder: '请选择',
      disabled: false,
      multiple: false,
      filterable: true,
      clearable: false,
      selectData: [
        {
          label: '全部',
          value: -1,
        },
        {
          label: '显示中',
          value: 1,
        },
        {
          label: '已隐藏',
          value: 0,
        },
      ],
    },
  },
  {
    prop: 'operate',
    label: '操作',
  },
]
export const sectionColumn = [
  {
    prop: 'num',
    label: '序号',
  },
  {
    prop: 'section',
    label: '匹配胜率区间',
  },
  {
    prop: 'operate',
    label: '操作',
  },
]
export const sectionTableData = [
  {
    num: 1,
    sectionStart: 0,
    sectionEnd: 100,
  },
]
export const initSectionTableData = [
  {
    num: 1,
    sectionStart: 0,
    sectionEnd: 100,
  },
]
export const sectionPagination = {
  pageSize: 20,
  currentPage: 1,
  total: 0,
}
export const sectionForm = {
  sectionStart: '',
  sectionEnd: '',
  num: '',
}
export const initSectionForm = {
  sectionStart: '',
  sectionEnd: '',
  num: '',
}
export const albumPagination = {
  pageSize: 20,
  currentPage: 1,
  total: 0,
}

export const albumFilterBtn = {
  type: 'button', children: [{ type: 'search' }, { type: 'reset' }],
}
export const albumFormFields = [
  { type: 'input', label: '专辑名称', prop: 'albumName', placeholder: '请输入' },
  { type: 'upload', label: '专辑封面', prop: 'albumCoverUpload', action: '', limit: 1, accept: 'image/png, image/jpeg, image/jpg' },
  {
    type: 'select',
    label: '专辑形态',
    prop: 'albumType',
    placeholder: '请选择',
    selectData: [{ label: '对战式', value: 1 }, { label: '非对战式', value: 2 }],
    filterable: true,
    clearable: true,
    disabled: false,
  },
  { type: 'imageTag', label: '关联游戏', prop: 'gameData', tagData: [], closable: true, addTagBtnOption: { name: '添加游戏' }},
  { type: 'customSlot', label: '匹配区间设定 ', prop: 'sectionData', hidden: false },
  { type: 'number', label: '排序权重', prop: 'weight', placeholder: '请输入', min: 1 },
  {
    type: 'select',
    label: '显示状态',
    prop: 'displayStatus',
    placeholder: '请选择',
    selectData: [{ label: '显示中', value: 1 }, { label: '已隐藏', value: 0 }],
    filterable: true,
    clearable: true,
  },
  { type: 'button', children:
    [
      { type: 'cancel' },
      { type: 'confirm' },
    ],
  },
]
// 校验规则
export const albumFormAttr = {
  formLabelWidth: '120px',
  formRules: {
    albumName: [{ required: true, message: '请输入专辑名称', trigger: 'blur' }],
    albumType: [{ required: true, message: '请选择专辑形态', trigger: 'change' }],
    albumCoverUpload: [{ required: true, message: '请上传专辑封面', trigger: 'change' }],
    weight: [{ required: true, trigger: 'blur', validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入权重'))
      } else if (!(/(^[1-9]\d*$)/.test(value.toString()))) {
        callback(new Error('请输入正整数'))
        return false
      } else {
        callback()
      }
    } }],
    gameData: [{ required: true, trigger: 'change' }],
    displayStatus: [{ required: true, message: '请选择显示状态', trigger: 'change' }],
    sectionData: [{ required: true, trigger: 'change' }],
  },
}

// 专辑形态
export const albumTypeObj = {
  1: '对战式',
  2: '非对战式',
}
// 专辑状态
export const albumStatusObj = {
  1: '显示中',
  0: '已隐藏',
}

// 初始化表单数据

export const albumNewFormData = { albumName: '', weight: '', albumCover: '', albumCoverUpload: [], albumType: '', displayStatus: '', gameData: [], sectionData: [] }
export const albumFormData = { albumName: '', weight: '', albumCover: '', albumCoverUpload: [], albumType: '', displayStatus: '', gameData: [], sectionData: [] }
