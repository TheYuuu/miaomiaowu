import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import store from './index';
export const storeName = 'elControl';

@Module({ dynamic: true, store, namespaced: true, name: storeName })
export class elControl extends VuexModule {
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
      , {
        name: '游戏',
        rid: '4'
      }
      // {
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

  watchBlockArr = [];

  get allArr() {
    return this.padArr.concat(this.navArr).concat(this.watchBlockArr);
  }

  get getWatchBlockArr() {
    return this.watchBlockArr;
  }

  @Mutation
  setWatchBlockArr(data) {
    this.watchBlockArr = data;
  }

  @Action
  async getWatchBlockArrByRid(rid) {
    let data = require('../assets/data/random.json').data;

    let index = 0;
    let arr = [];
    while(index < data.archives.length) {
      arr.push(data.archives.slice(index, index += 4));
    }

    this.setWatchBlockArr(arr);
  }
}

export const elControlStore = namespace(storeName);