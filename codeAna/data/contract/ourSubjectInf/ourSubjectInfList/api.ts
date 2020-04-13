import axios from '@/utils/http';
let basePath = '';

//条约规则列表页查询
function getOurSubjectInfList(params: any) {
  return axios.get(basePath + '/klcss/meta/ourSubject/r/pageList', {
    params: params
  });
}

//查询我方主体信息详情
function getOurSubjectInfDetail(params: any) {
  return axios.get(basePath + '/klcss/meta/ourSubject/r/getDetail', {
    params: params
  });
}

//新增/修改我方主体
function updateOurSubjectInf(data: any) {
  return axios.post(basePath + '/klcss/meta/ourSubject/w/update', data);
}

export default {
  getOurSubjectInfList,
  getOurSubjectInfDetail,
  updateOurSubjectInf
};
