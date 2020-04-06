import axios from '@/utils/http';
let basePath = '';

// 销售合同列表页查询
function getContractList(params: any) {
  return axios.get(basePath + '/klcss/sale/formal/r/pageQuery', {
    params: params
  });
}

// 盖章确认
function dealSeal(data: any) {
  return axios.post(basePath + '/klcss/sale/formal/w/confirmAttachment', data);
}

// 是否有终止协议
function hasStopAgreement(params: Object) {
  return axios.get(basePath + '/klcss/sale/formal/r/hasStopAgreement', {
    params: params
  });
}

// 删除附件
function delAttachment(data: any) {
  return axios.post(basePath + '/klcss/sale/basic/w/delAttachment', data);
}

export default {
  getContractList,
  dealSeal,
  hasStopAgreement,
  delAttachment
};
