import axios from '@/utils/http';
let basePath = '';

// 事业部查询
function getBuList() {
  return axios.get(basePath + '/klcss/sale/basic/r/buList');
}

// 获取我方主体信息列表
function getOurSubject(params: any) {
  return axios.get(basePath + '/klcss/sale/basic/r/pageOurSubject', {
    params: params
  });
}

// 获取合作方主体信息列表
function getCooperationsubject(params: any) {
  return axios.get(basePath + '/klcss/sale/basic/r/pagePartner', {
    params: params
  });
}

// 获取合作方银行信息
function getPeerSubjectBank(params: any) {
  return axios.get(basePath + '/klcss/sale/basic/r/pageBankInvoice', {
    params: params
  });
}

export default {
  getBuList,
  getOurSubject,
  getCooperationsubject,
  getPeerSubjectBank
};
