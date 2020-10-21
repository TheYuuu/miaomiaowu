<template>
<div class="h-full">
  <el-carousel indicator-position="none" ref="carousel" style="height:100%" :autoplay="false" arrow="nerver">
    <el-carousel-item :name="item.rid" v-for="(item, index) in list" :key="JSON.stringify(item) + 'nacCon'">
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

import block from './block';
@Component({
  name: 'navCon',
  components: {
    block
  }
})
export default class extends Vue {
  @Prop() list;

  mounted() {
    this.activeName = this.list[0].rid;
  }

  changeTab(activeName) {
    this.$refs.carousel.setActiveItem(activeName);
  }
}
</script>

<style lang="scss">

</style>
