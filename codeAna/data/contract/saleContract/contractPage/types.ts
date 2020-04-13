export interface basicInfoInterFace {
  creatorName: string,
  creatorId: string,
  applyDate: string | Date,
  contractBuName: string,
  contractBuId: string,
  contractType: string, // 合同种类
  contractTypeStr: string, // 合同种类
  contractSubTypeStr: string, // 合同类型
  contractName: string,
  contractProperty: string, // 合同属性
  sealed: boolean,
  supplementaryType: string,
  effectiveTime: string | Date,
  expirationTime: string | Date,
  latestContractCode?: string,
  contractCode?: string
}

export interface subjectInfoInterFace {
  saleOurSubjectVo: saleOurSubjectVoInterFace,
  saleOurBankVo: saleOurBankVoInterFace
}

export interface saleOurSubjectVoInterFace {
  // # 我方主体名称
  id: string,
  // # 我方主体ID
  subjectName: string,
  // # 我方联系人
  contact: string,
  // # 我方联系人电话
  phoneNo: string,
  // # 我方联系人邮箱
  email: string,
  // # 我方公司地址
  address: string
}

export interface paymentClauseInterFace {
  settlementType: string,
  settlementTerm: string,
  paymentSettlement: string,
  invoiceSequence: string,
  invoiceType: Array<string>,
  paymentClass: string,
  settlementFixedDate?: string,
  settlementFixedDays?: string,
  saleSettlementCustomCycleVoList?: Array<any>,
  paymentPlusDays?: string,
  saleOurBankVo: saleOurBankVoInterFace,
  billingPeriodQuota: string
}

export interface saleOurBankVoInterFace {
  ourBankCardType: string,
  ourAccountName: string,
  ourBankCardNumber: string,
  ourBankName: string,
  ourBankBranchName: string
}

export interface otherInfoInterFace {
  saleAttachmentVoList: Array<any>,
  remark: string
}

export interface enumItem {
  name: string,
  value: string | undefined
}

export interface peerSubjectListInterFace {
  partnerId: string,
  partnerSubjectName: string,
  unifiedSocialCreditCode: string,
  contacts: string,
  contactPhone: string,
  companyAddress: string
}

export interface partnerSubjectPayInfoInterFace {
  salePartnerBankVo: salePartnerBankVoInterFace,
  saleInvoiceInfoVo: saleInvoiceInfoVoInterFace
}

export interface salePartnerBankVoInterFace {
  partnerBankCardType: string,
  partnerBankCardTypeStr: string,
  partnerAccountName: string,
  partnerBankCardNumber: string,
  partnerBankName: string,
  partnerBankBranchName: string
}

export interface saleInvoiceInfoVoInterFace {
  invoiceCompanyName: string,
  invoiceTaxpayerNumber: string,
  invoiceCompanyPhone: string,
  invoiceCompanyBankName: string,
  invoiceCompanyAccount: string,
  invoiceCompanyAddress: string
}

export interface formDisableInterFace {
  basicInfo: basicInfoFormDisableInterFace,
  subjectInfo: boolean,
  paymentInfo: boolean,
  otherInfo: boolean
}

export interface basicInfoFormDisableInterFace {
  contractName: boolean,
  creatorName: boolean,
  sealed: boolean,
  contractProperty: boolean,
  effectiveTime: boolean,
  expirationTime: boolean,
}