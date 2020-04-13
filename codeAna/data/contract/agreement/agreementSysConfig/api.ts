import axios from '@/utils/http';
let basePath = '';

// 查询贴码配置品类
function categoryQuery() {
  return axios.get(basePath + '/klcss/agreement/pca/category/r/query');
}

// 修改贴码配置品类
function categorySave(data: any) {
  return axios.post(basePath + '/klcss/agreement/pca/category/w/save', data);
}

export default {
  categoryQuery,
  categorySave
};
