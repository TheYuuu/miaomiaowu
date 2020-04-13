export const contractTypeList = [
  {
    label: '全部',
    value: 'ALL'
  },
  {
    label: '销售',
    value: 'ACCOUNT_PAY_CONTRACT'
  }
];

// 合同类型
export const contractSubTypeList = {
  ALL: [
    {
      label: '全部',
      value: ''
    }
  ],
  ACCOUNT_PAY_CONTRACT: [
    {
      label: '账期付款合同',
      value: 'ACCOUNT_PAY_CONTRACT'
    }
  ]
};

// 签约类型
export const supplementaryList = [
  {
    label: '主合同',
    value: 'NON_SUPPLEMENTARY'
  },
  {
    label: '条款修改',
    value: 'MODIFY_CLAUSE'
  },
  {
    label: '终止协议',
    value: 'STOP_AGREEMENT'
  }
];

// 是否盖章
export const sealedList = [
  {
    label: '全部',
    value: undefined
  },
  {
    label: '是',
    value: 'true'
  },
  {
    label: '否',
    value: 'false'
  }
];

// 合同状态
export const contractStatusList = [
  {
    label: '全部',
    value: undefined
  },
  {
    label: '已批准',
    value: 'APPROVED'
  },
  {
    label: '已生效',
    value: 'EFFECTIVE'
  },
  {
    label: '已到期',
    value: 'EXPIRED'
  },
  {
    label: '已终止',
    value: 'TERMINATED'
  }
];