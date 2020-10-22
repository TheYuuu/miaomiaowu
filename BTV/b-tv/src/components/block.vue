<template>
<div class="h-full">
  <div v-for="(item) in [cat2Arr]" :key="JSON.stringify(item)" class="flex_con subNan_con">
    <el-card v-for="(mm) in item" :key="mm.name" class="box-card chooseAble chooseAble_sub" tabindex="0" @focus.native="changeSubTab(mm)">
      {{ mm.name }}
    </el-card>
  </div>

  <el-carousel indicator-position="none" ref="subCarousel" style="height:100%" :autoplay="false" arrow="never" class="video_carousel">
    <el-carousel-item :name="item.rid" v-for="(item) in cat2Arr" :key="JSON.stringify(item) + 'nacCon'">
      <div v-for="col in randomArr" :key="JSON.stringify(col)" class="flex_con sub_pad_con">
        <div v-for="item in col" :key="item.name" tabindex="0" class="box-card chooseAble" @keyup.enter="openVideoInf(item)">
          <videCard :inf="item" />
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import {
  Component,
  Vue
} from 'vue-property-decorator';

import {
  elControlStore
} from '../store/elControl';

import {
  videoControlStore
} from '../store/videoControl';

import videCard from './videCard';
@Component({
  name: 'block',
  components: {
    videCard
  }
})
export default class extends Vue {
  @elControlStore.Getter('getWatchBlockArr') randomArr;

  @elControlStore.Action('setCat2RidAction') setCat2RidAction;

  @elControlStore.Getter('getCat2Arr') getCat2Arr;

  @elControlStore.Action('getWatchBlockArrByRid') getWatchBlockArrByRid;

  @videoControlStore.Action('openVideo') openVideo;

  @videoControlStore.Action('changeVideoInf') changeVideoInf;

  get cat2Arr() {
    return this.getCat2Arr;
  }

  mounted() {
    console.log(this.changeVideoInf);
  }

  changeSubTab(item) {
    console.log(item)
    this.$refs.subCarousel.setActiveItem(item.rid);
    this.setCat2RidAction((item.rid));
    this.getWatchBlockArrByRid();
  }

  openVideoInf(item) {
    console.log(item)
    this.changeVideoInf(item);
    setTimeout(() => {
      this.openVideo();
    }, 300)
  }
}
</script>

<style lang="scss">
.sub_pad_con {
  font-size: 2.2rem;
  padding: 10px 20px;
}

.subNan_con {
  height: 30px;
  font-size: 1.4rem;
}
</style>
