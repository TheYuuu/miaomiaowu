import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import store from './index';
export const storeName = 'videoControl';

@Module({ dynamic: true, store, namespaced: true, name: storeName })
export class videoControl extends VuexModule {
  showVideo = false;

  videoInf = {};

  get getShowVideo() {
    return this.showVideo;
  }

  @Mutation
  setShowVideo(val) {
    this.showVideo = val;
  }

  @Action
  openVideo() {
    this.setShowVideo(true);
  }

  @Action
  closeVideo() {
    this.setShowVideo(false);
  }

  @Mutation
  setVideoInf(val) {
    this.videoInf = val;
  }

  get getVideoInf() {
    return this.videoInf;
  }

  @Action
  changeVideoInf(data) {
    this.setVideoInf(data);
  }
}

export const videoControlStore = namespace(storeName);