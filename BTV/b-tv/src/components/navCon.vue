<template>
<div class="h-full">
  <el-carousel indicator-position="none" ref="carousel" style="height:100%" :autoplay="false" arrow="nerver">
    <el-carousel-item :name="item.rid" v-for="(item) in list" :key="JSON.stringify(item) + 'nacCon'">
      <div class="video_con">
        <block :inf="item" />
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';

import {
  elControlStore
} from '../store/elControl';

import block from './block';
@Component({
  name: 'navCon',
  components: {
    block
  }
})
export default class extends Vue {
  @Prop() list;

  @elControlStore.Action('getWatchBlockArrByRid') getWatchBlockArrByRid;

  @elControlStore.Getter('getCat1Rid') getCat1Rid;

  get cat2Rid() {
    return this.getCat1Rid;
  }

  mounted() {
    this.changeTab(this.list[0].rid);
  }

  changeTab() {
    this.$refs.carousel.setActiveItem(this.cat2Rid);
    this.getWatchBlockArrByRid(this.cat2Rid);
  }
}
</script>

<style lang="scss">

</style>
