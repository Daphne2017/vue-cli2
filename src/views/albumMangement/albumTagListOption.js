export const tagColumn = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'gameName',
    label: '游戏名称',
    filterOption: {
      type: 'input',
      label: '游戏名称',
      prop: 'gameName',
      placeholder: '请输入',
      formChildWidth: '250px',
    },
  },
  {
    prop: 'gameIcon',
    label: 'icon图标',
  },
  {
    prop: 'gameType',
    label: '游戏形态',
    filterOption: {
      type: 'select',
      label: '游戏形态',
      prop: 'gameType',
      placeholder: '请选择',
      disabled: false,
      multiple: false,
      filterable: true,
      clearable: false,
      selectData: [
        { label: '对战类', value: 1 },
        { label: '通关类', value: 2 },
        { label: '无形态', value: 3 },
        { label: '全部', value: '' },
      ],
    },
  },
  {
    prop: 'gameTagData',
    label: '标签关联',
  },
  {
    prop: 'putStatus',
    label: '状态',
  },
  {
    prop: 'operate',
    label: '操作',
  },
]
export const tagPagination = {
  pageSize: 20,
  currentPage: 1,
  total: 0,
}

export const tagFilterBtn = {
  type: 'button', children: [{ type: 'search' }, { type: 'reset' }],
}

