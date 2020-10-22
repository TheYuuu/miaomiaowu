import axios from 'axios';

function getHotList(params) {
  const defaultParams = {
    main_ver: 'v3',
    search_type: 'video',
    view_type: 'hot_rank',
    order: 'click',
    copy_right: -1,
    cate_id: 20,
    page: 2,
    pagesize: 20,
    time_from: 20201015,
    time_to: 20201022
  };

  const p = Object.assign(defaultParams, params);

  return axios
    .get('https://s.search.bilibili.com/cate/search', { params: p })
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
      return Promise.reject(res);
    });
}


export default {
  getHotList
};
