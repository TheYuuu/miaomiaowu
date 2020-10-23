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
