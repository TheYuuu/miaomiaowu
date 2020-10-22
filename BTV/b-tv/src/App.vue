<template>
<div v-on:keydown="keyDown($event)" class="h-full">
  <el-container class="h-full">
    <el-header>
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
    </el-header>
    <el-main>
      <nav-con :list="navArr" ref="navCon"></nav-con>
    </el-main>
  </el-container>
  <video-drawer />
</div>
</template>

<script>
import {
  Component,
  Vue
} from 'vue-property-decorator';

import videoDrawer from './components/videoDrawer';
import navCon from './components/navCon';

import {
  elControlStore
} from './store/elControl';

@Component({
  name: 'App',
  components: {
    videoDrawer,
    navCon
  }
})
export default class extends Vue {
  @elControlStore.State('padArr') padArr;
  @elControlStore.State('navArr') navArr;
  @elControlStore.Getter('allArr') getAllArr;

  @elControlStore.Action('setCat1RidAction') setCat1RidAction;
  @elControlStore.Action('setCat2RidAction') setCat2RidAction;
  @elControlStore.Action('setCat2ArrAction') setCat2ArrAction;

  get allArr() {
    return this.getAllArr;
  }

  mounted() {
    this.changeTab(this.navArr[0]);

    this.$nextTick(() => {
      this.getChooseAble();
      this.inputs[0].focus();
    });
  }

  getChooseAble() {
    const headInputs = Array.from(document.querySelectorAll('.el-header .chooseAble'));
    const cardInputs = Array.from(Array.from(document.querySelectorAll('.el-carousel__item'))
      .filter(item => item.style.transform === 'translateX(0px) scale(1)')[0].querySelectorAll('.chooseAble'));

    this.inputs = headInputs.concat(cardInputs);
  }

  keyDown(event) {
    this.$nextTick(() => {
      this.getChooseAble();
      let focus = document.activeElement;

      event = window.event || event;
      let key = event.keyCode;
      for (var i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i] === focus) break;
      }

      let c = i;
      let index = 0;

      while (c >= this.allArr[index].length) {
        c = c - this.allArr[index++].length;

        if (!this.allArr[index]) {
          break;
        }
      }

      let len = this.allArr[index].length;

      switch (key) {
        case 37:
          if (i > 0) this.inputs[i - 1].focus();
          break;
        case 38:
          if (i - len >= 0) this.inputs[i - len].focus();
          else this.inputs[0].focus();
          break;
        case 39:
          if (i < this.inputs.length - 1) this.inputs[i + 1].focus();
          break;
        case 40:
          if (i + len < this.inputs.length) this.inputs[i + len].focus();
          break;
      }
    });
  }

  changeTab(item) {
    this.setCat1RidAction(item.rid);

    const sub = item.sub || [];
    if (sub[0]) {
      this.setCat2RidAction((sub[0].rid));
    }

    this.setCat2ArrAction(item.sub || []);
    this.$refs.navCon.changeTab();
  }

  changePad(item) {
    console.log(123, item)
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.chooseAble {
  display: inline-block;
  height: 100%;
  flex: 1;
  border: 1px solid;
  margin: 5px;
  transition: all 0.3s;
}

.chooseAble:focus {
  transform: scale(1.1);
}

.flex_con {
  display: flex;
  margin: 5px 0px;
  width: 100%;
}

.flex_con>div:first-child {
  margin-left: 0;
}

.flex_con>div:last-child {
  margin-right: 0;
}

.pad_con {
  height: calc(70% - 20px);
  font-size: 2.2rem;
}

.nan_con {
  height: 30%;
  font-size: 1.4rem;
}

.el-card>.el-card__body {
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.el-header {
  text-align: center;
  height: 165px !important;
  text-align: center;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}
</style>
