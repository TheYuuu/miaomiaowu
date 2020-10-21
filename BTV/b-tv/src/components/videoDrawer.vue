<template>
<div>
  <el-drawer :visible.sync="show" :with-header="false" label="btt" :show-close="false" :append-to-body="true" size="100%">
    <div class="video_contrl">
      <el-button type="primary" tabindex="0" class="chooseAble">全 屏</el-button>
      <el-button type="primary" tabindex="0" class="chooseAble">返 回</el-button>
    </div>
    <iframe class="bvideo" :src="'//player.bilibili.com/player.html?aid=' + videInf.aid + '&bvid=' + videInf.bvid + '&cid=' + videInf.cid" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
  </el-drawer>
</div>
</template>

<script>
import {
  Component,
  Vue
} from 'vue-property-decorator';

@Component({
  name: 'videoDrawer',
  components: {}
})
export default class extends Vue {
  show = false;
  videInf = {};

  mounted() {}

  open(inf) {
    console.log(inf)
    this.show = true;
  }
  close() {
    this.show = false;
  }
}
</script>

<style lang="scss">

</style>
