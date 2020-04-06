import axios from '@/utils/http';
let basePath = '';

// 合作方主体查询
function qualifiedVendorList(params: any) {
  return axios.get(basePath + '/klcss/purchase/draft/r/qualifiedVendorList', {
    params: params
  });
}

export default {
  qualifiedVendorList
};
