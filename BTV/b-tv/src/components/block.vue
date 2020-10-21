<template>
<div>
  <div v-for="col in randomArr" :key="JSON.stringify(col)" class="flex_con pad_con">
    <div v-for="item in col" :key="item.name" tabindex="0" class="box-card chooseAble" @keyup.enter="openVideoInf(item)">
      <videCard :inf="item" />
    </div>
  </div>
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

  @videoControlStore.Action('openVideo') openVideo;

  @videoControlStore.Action('changeVideoInf') changeVideoInf;

  mounted() {
    console.log(this.changeVideoInf);
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

</style>
