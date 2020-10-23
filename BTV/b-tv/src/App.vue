<template>
<div v-on:keydown="keyDown($event)" class="h-full">
  <el-container class="h-full">
    <el-header>
      <nav-con />
    </el-header>
    <el-main>
      <block />
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
import block from './components/block';
import navCon from './components/navCon';

import {
  elControlStore
} from './store/elControl';

@Component({
  name: 'App',
  components: {
    videoDrawer,
    block,
    navCon
  }
})
export default class extends Vue {
  @elControlStore.Getter('allArr') getAllArr;

  get allArr() {
    return this.getAllArr;
  }

  mounted() {
    this.$nextTick(() => {
      this.getChooseAble();
      this.inputs[0].focus();
    });
  }

  getChooseAble() {
    const headInputs = Array.from(document.querySelectorAll('.el-header .chooseAble'));

    const cardInputs = Array.from(document.querySelectorAll('.video_carousel .chooseAble'));

    this.inputs = headInputs.concat(cardInputs);
  }

  keyDown(event) {
    this.$nextTick(() => {
      this.getChooseAble();
      let focus = document.activeElement;

      event = window.event || event;
      let key = event.keyCode;

      let index = 0;

      search:
        for (var i = 0; i < this.allArr.length; i++) {
          for (var j = 0; j < this.allArr[i].length; j++) {
            if (this.inputs[index] === focus) break search;
            else index++;
          }
        }
      const len = this.allArr[i].length;

      switch (key) {
        case 37:
          if (index > 0) this.inputs[index - 1].focus();
          break;
        case 38:
          if (i === 0) break;

          const lastLen = this.allArr[i - 1].length;
          let m = Math.round((j + 1) / len * this.allArr[i - 1].length);

          let cha = lastLen - m;
          this.inputs[index - j - 1 - cha].focus();

          break;
        case 39:
          if (index < this.inputs.length - 1) this.inputs[index + 1].focus();
          break;
        case 40:
          if (i === this.allArr.length - 1) break;

          let n = Math.round((j + 1) / len * this.allArr[i + 1].length);
          let duo = len - j - 1;
          this.inputs[index + n + duo].focus();
          break;
      }
    });
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
  margin: 5px;
  transition: all 0.3s;
}

.chooseAble:focus {
  transform: scale(1.1);
  outline: none;
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
  height: calc(55% - 20px);
  font-size: 2.2rem;
}

.nan_con {
  height: 30%;
  font-size: 1.4rem;
}

.box-card>.el-card__body {
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

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.subNan_con {
  height: 15%;
  font-size: 1rem;
}
</style>
