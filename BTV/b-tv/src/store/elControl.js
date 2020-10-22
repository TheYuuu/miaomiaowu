import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import store from './index';
export const storeName = 'elControl';

import  api  from '../api/api';

import axios from 'axios';

import config from '../assets/config.json';

@Module({ dynamic: true, store, namespaced: true, name: storeName })
export class elControl extends VuexModule {
  padArr = config.padArr;
  navArr = config.navArr.slice(0, 2);

  cat1Rid = '';
  cat2Rid = '';

  cat2Arr = [];

  watchBlockArr = [];

  get allArr() {
    return [this.padArr]
      .concat([this.navArr])
      .concat(this.cat2Arr && [this.cat2Arr])
      .concat(this.watchBlockArr);
  }

  get getWatchBlockArr() {
    return this.watchBlockArr;
  }

  get getCat1Rid() {
    return this.cat1Rid;
  }

  get getCat2Rid() {
    return this.cat2Rid;
  }

  get getCat2Arr() {
    return this.cat2Arr;
  }

  @Mutation
  setWatchBlockArr(data) {
    this.watchBlockArr = data;
  }

  @Mutation
  setCat1Rid(data) {
    this.cat1Rid = data;
  }

  @Mutation
  setCat2Rid(data) {
    this.cat2Rid = data;
  }

  @Mutation
  setCat2Arr(data) {
    this.cat2Arr = data;
  }

  @Action({rawError: true})
  async getWatchBlockArrByRid() {
    if (!this.cat2Rid) {
      return;
    }

    const data = await api.getHotList({
      cate_id: this.cat2Rid
    });

    const arrs = data.result;

    let index = 0;
    let arr = [];
    while(index < arrs.length) {
      arr.push(arrs.slice(index, index += 4));
    }

    this.setWatchBlockArr(arr);
  }

  @Action
  async setCat1RidAction(data) {
    this.setCat1Rid(data);
  }

  @Action
  async setCat2RidAction(data) {
    this.setCat2Rid(data);
  }

  @Action
  async setCat2ArrAction(data) {
    this.setCat2Arr(data);
  }
}

export const elControlStore = namespace(storeName);