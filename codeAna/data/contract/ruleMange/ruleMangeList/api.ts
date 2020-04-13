import axios from '@/utils/http';
let basePath='';

//条约规则列表页查询
function getRuleList(params:any){
    return axios.get(basePath + '/klcss/purchase/rule/r/pageRuleList', {
        params: params
    });
}

//条约规则状态变更
function updateRuleStatus(data:any){
    return axios.post(basePath + '/klcss/purchase/rule/w/updateRuleStatus', data);
}


export default {
    getRuleList,
    updateRuleStatus
};
