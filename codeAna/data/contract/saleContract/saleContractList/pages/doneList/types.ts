export interface enumItem {
  label: string,
  value: string | undefined
}

export interface params {
  contractCode: string,
  contractName: string,
  ourSubjectName: string,
  partnerSubjectName: string,
  contractType: enumItem,
  supplementaryTypes: Array<enumItem>,
  bothSealed: enumItem,
  contractSubType: enumItem,
  contractStatus: enumItem,
  effectiveTimeStart: string,
  expirationTimeEnd: string,
  applyCode: string
}

export interface Pagination {
  pageNo: number,
  pageSize: number,
  totalPageCount: number,
  totalCount: number
}