<template>
<div>
  <div v-for="(item) in [padArr]" :key="JSON.stringify(item)" class="flex_con pad_con">
    <el-card v-for="(mm) in item" :key="mm.name" class="box-card chooseAble" tabindex="0" @keyup.enter.native="changePad(mm)">
      {{ mm.name }}
    </el-card>
  </div>
  <div v-for="(item) in [navArr]" :key="JSON.stringify(item)" class="flex_con nan_con">
    <el-card v-for="(mm) in item" :key="mm.name" class="box-card chooseAble" tabindex="0" @focus.native="changeTab(mm)">
      {{ mm.name }}
    </el-card>
  </div>
  <div v-for="(item) in [cat2Arr]" :key="JSON.stringify(item)" class="flex_con subNan_con">
    <el-card v-for="(mm) in item" :key="mm.name" class="box-card chooseAble chooseAble_sub" tabindex="0" @focus.native="changeSubTab(mm)">
      {{ mm.name }}
    </el-card>
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

@Component({
  name: 'navCon',
  components: {}
})
export default class extends Vue {
  @elControlStore.State('padArr') padArr;
  @elControlStore.State('navArr') navArr;

  @elControlStore.Action('setCat1RidAction') setCat1RidAction;
  @elControlStore.Action('setCat2RidAction') setCat2RidAction;
  @elControlStore.Action('setCat2ArrAction') setCat2ArrAction;

  @elControlStore.Getter('getCat2Arr') getCat2Arr;

  @elControlStore.Action('getWatchBlockArrByRid') getWatchBlockArrByRid;

  get cat2Arr() {
    return this.getCat2Arr;
  }

  mounted() {
    this.changeTab(this.navArr[0]);
  }

  changeTab(item) {
    this.setCat1RidAction(item.rid);

    const sub = item.sub || [];
    if (sub[0]) {
      this.setCat2RidAction((sub[0].rid));
    }

    this.setCat2ArrAction(item.sub || []);
    this.getWatchBlockArrByRid();
  }

  changeSubTab(item) {
    this.setCat2RidAction((item.rid));
    this.getWatchBlockArrByRid();
  }

  changePad(item) {

  }
}
</script>

<style>

</style>
