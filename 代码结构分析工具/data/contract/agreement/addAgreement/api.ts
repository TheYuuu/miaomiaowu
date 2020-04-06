import axios from '@/utils/http';
let basePath = '';

// 贴码合同提交
function agreementSubmit(data: any) {
  return axios.post(basePath + '/klcss/agreement/pca/w/submit', data);
}

export default {
  agreementSubmit
};
