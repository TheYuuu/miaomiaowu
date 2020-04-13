import { Component, Vue, Watch } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import appApi from './api';

import {
  treeNode
} from './types'

@Component({
  components: {
  }
})
export default class agreementSysConfig extends Vue {
  submitFlag: boolean = false;
  tree: Array<treeNode> = [];
  defaultChecked: Array<number | string> = [];
  defaultProps = {
    children: 'childCats',
    label: 'catName'
  };
  filterText: string = '';
  parentNodeMap: any = {};
  filterMap: any = {};

  @Watch('filterText')
  filterTextChange(val: string) {
    this.filterMap = {};
    let agreementTree: any = this.$refs.agreementTree;
    agreementTree.filter(val);
  }

  mounted() {
    const vm = this;
    appApi.categoryQuery().then(({ data: { data, status } }) => {
      if (status) {
        vm.tree = data;

        // 初始化选中状态
        vm.DFS(vm.tree, null,(item: treeNode, parentNode: treeNode) => {
          if (item.checked && item.level !== 1) {
            vm.defaultChecked.push(item.catId);
          }

          vm.parentNodeMap[item.catId] = parentNode && parentNode.catId;
        });
      }
    });
  }

  DFS(tree: Array<treeNode>, parentNode: treeNode | null, cb: Function) {
    if (!tree.length || !tree) {
      return;
    }

    for (let i = 0; i< tree.length; i++) {
      cb(tree[i], parentNode);

      if (tree[i].childCats && tree[i].childCats.length) {
        this.DFS(tree[i].childCats, tree[i], cb);
      }
    }
  }

  check() {
    const checkedKeys = arguments[1].checkedKeys;
    const vm = this;
    vm.DFS(vm.tree, null, (item: treeNode, parentNode: treeNode) => {
      item.checked = checkedKeys.indexOf(item.catId) > -1
        ? true : false;

      if (item.checked && item.childCats.length === 0) {
        item.checked = true;
      }

      // 只要有子节点选中, 父节点就为true
      if (parentNode && item.checked) {
        parentNode.checked = true;
      }
    });
  }

  submit() {
    const vm = this;
    vm.submitFlag = true;
    appApi.categorySave({
      categoryConfig: vm.tree
    }).then(({ data: { status, message } }) => {
      if (status) {
        vm.$notify.success(message);

        setTimeout(()=>{
          remote.$state.go('app.contract.agreementList');
        }, 2000);
      } else {
        vm.submitFlag = false;
      }
    }).catch(() => {
      vm.submitFlag = false;
    });
  }

  filterNode(value: string, data: any) {
    if (!value) return true;

    this.filterMap[data.catId] = data.catName.indexOf(value) !== -1;

    return data.catName.indexOf(value) !== -1
     || this.filterMap[this.parentNodeMap[data.catId]];
  }

  cancle() {
    remote.$state.go('app.contract.agreementList');
  }
}