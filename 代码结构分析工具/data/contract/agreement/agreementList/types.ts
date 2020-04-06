export interface enumItem {
  label: string,
  value: string | undefined
}

export interface params {
  agreementCode: string,
  vendorName: string,
  vendorCode: string,
  signType: string,
  signStatus: string,
  createTimeStart: string,
  createTimeEnd: string
}

export interface Pagination {
  pageNo: number,
  pageSize: number,
  totalPageCount: number,
  totalCount: number
}