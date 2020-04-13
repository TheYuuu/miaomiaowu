export interface ListParams {
  ourSubjectName: string
}

export interface DialogParams {
  isLegalPersonExist: boolean,
  ourSubjectId: string,
  ourSubjectName: string,
  businessLicence: string,
  bankName: string,
  bankCardNo: string,
  bankCardName: string,
  contactAddress: string,
  contactPhone: string,
  legalPersonName: string | null,
  legalPersonIdCard: string | null,
  legalPersonPhone: string | null
}

export interface TableData {
  ourSubjectId: string,
  ourSubjectName: string,
  businessLicence: string,
  bankName: string,
  bankCardNo: string,
  bankCardName: string,
  contactAddress: string,
  contactPhone: string,
  legalPersonName: string,
  legalPersonIdCard: string,
  legalPersonPhone: string
}

export interface Pagination {
  pageNo: number,
  pageSize: number,
  totalCount: number
}