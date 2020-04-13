export default {
  name: 'saleRulePage',
  path: '/contract/saleRulePage/:method/:contractRuleType?/:id?',
  component: () => import('./view.vue')
};
