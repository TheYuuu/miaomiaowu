import axios from '@/utils/http';
let basePath='';

//分页查看白名单
function getPageWhiteList(params:any) {
    return axios.get(basePath + '/klcss/purchase/rule/whitelist/r/pageWhiteList', {
        params: params
    });
}

//白名单模版下载
function getWhiteListTemplate() {
  window.open(basePath + '/klcss/purchase/rule/whitelist/r/downloadTemplate');
}

// 品牌查询
function queryBrand(params:any) {
  return axios.get(basePath + '/ssc/brand/r/listBrandsByName', {
    params: params
  });
}

// 类目查询
function queryCat(params:any) {
  return axios.get(basePath + '/scs/category/r/listByParentId', {
    params: params
  });
}

// 条约规则详情查看
function getRuleDetail(params:any) {
  return axios.get(basePath + '/klcss/purchase/rule/r/detail', {
      params: params
  });
}

//上传条款白名单
function uploadWhiteList(data:any) {
  return axios.post(basePath + '/klcss/purchase/rule/whitelist/w/uploadWhiteList', data);
}

//发布采购合同条约规则
function publishRule(data:any) {
  return axios.post(basePath + '/klcss/purchase/rule/w/publishRule', data);
}



export default {
  getPageWhiteList,
  getWhiteListTemplate,
  uploadWhiteList,
  queryBrand,
  queryCat,
  getRuleDetail,
  publishRule
};
