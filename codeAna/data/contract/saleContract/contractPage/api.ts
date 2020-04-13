import axios from '@/utils/http';
let basePath = '';

// 获取合作方付款开票详细信息
function getPageBankInvoice(params: any) {
  return axios.get(basePath + '/klcss/sale/basic/r/pageBankInvoice', {
    params: params
  });
}

// 草稿
function saveDraft(data: any) {
  return axios.post(basePath + '/klcss/sale/draft/w/save', data);
}

// 提交
function submitDraft(data: any) {
  return axios.post(basePath + '/klcss/sale/draft/w/submit', data);
}

// 获取草稿内容
function getDraftData(params: any) {
  return axios.get(basePath + '/klcss/sale/draft/r/detail', {
    params: params
  });
}

// 获取正式内容
function getViewData(params: any) {
  return axios.get(basePath + '/klcss/sale/formal/r/detail', {
    params: params
  });
}

// 补充协议-根据主合同编码查询最新版本合同内容
function getLatestData(params: any) {
  return axios.get(basePath + '/klcss/sale/formal/r/latest', {
    params: params
  });
}

// 删除附件
function delAttachment(data: any) {
  return axios.post(basePath + '/klcss/sale/basic/w/delAttachment', data);
}

// 补充协议-根据主合同编码查询最新版本合同内容
function getPrimaryCode(params: any) {
  return axios.get(basePath + '/klcss/sale/formal/r/primary', {
    params: params
  });
}



export default {
  getPageBankInvoice,
  saveDraft,
  submitDraft,
  getDraftData,
  getViewData,
  getLatestData,
  delAttachment,
  getPrimaryCode
};
