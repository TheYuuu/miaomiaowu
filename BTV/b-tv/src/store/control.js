import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import store from './index';
export const storeName = 'control';

@Module({ dynamic: true, store, namespaced: true, name: storeName })
export class control extends VuexModule {
  padArr = [
    [{
      name: '历史记录'
    }, {
      name: '关注动态'
    }, {
      name: '我的收藏'
    }, {
      name: '个人信息'
    }],
  ];

  navArr = [
    [{
        name: '舞蹈',
        rid: '129'
      }
      // , {
      //   name: '游戏',
      //   rid: '4'
      // }, {
      //   name: '知识',
      //   rid: '36'
      // }, {
      //   name: '数码',
      //   rid: '188'
      // }, {
      //   name: '生活',
      //   rid: '160'
      // }, {
      //   name: '鬼畜',
      //   rid: '119'
      // }, {
      //   name: '时尚',
      //   rid: '5'
      // }
    ]
  ];

  get allArr() {
    return this.padArr.concat(this.navArr);
  }
}

export const controlStore = namespace(storeName);