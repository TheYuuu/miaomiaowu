import axios from '@/utils/http';
let basePath = '';

// 列表页查询
function getContractList(params: any) {
  return axios.get(basePath + '/klcss/agreement/pca/r/pageList', {
    params: params
  });
}

// 查看盖章文件
function getSealedFile(params: any) {
  return axios.get(basePath + '/klcss/agreement/pca/r/getSealedFile', {
    params: params
  });
}

// 上传贴码盖章文件
function dealSeal(data: any) {
  return axios.post(basePath + '/klcss/agreement/pca/w/addSealedFile', data);
}

export default {
  getContractList,
  dealSeal,
  getSealedFile
};
