import axios from '@/utils/http';
let basePath = '';

// 销售合同列表页查询
function getBuList() {
  return axios.get(basePath + '/klcss/sale/basic/r/buList');
}

export default {
  getBuList
};
