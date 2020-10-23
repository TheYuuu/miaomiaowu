<template>
<div class="video_con">
  <div class="video_carousel">
    <transition-group v-on:enter="enter" v-on:leave="leave">
      <div v-for="col in randomArr" :key="JSON.stringify(col)" class="flex_con sub_pad_con">
        <div v-for="item in col" :key="item.name" tabindex="0" class="box-card chooseAble" @keyup.enter="openVideoInf(item)">
          <videCard :inf="item" />
        </div>
      </div>
    </transition-group>
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

import Velocity from 'velocity-animate'

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

  get showItem() {
    return this.messageList[this.index];
  }

  messageList = [{
      text: '第一条1',
      id: 1
    },
    {
      text: '第二条2',
      id: 2
    },
    {
      text: '第三条3',
      id: 3
    }
  ];
  index = 0;

  direction = 1;

  left() {
    this.direction = -1;
    if (this.index - 1 >= 0) {
      this.index--;
    } else {
      this.index = this.messageList.length - 1;
    }
  }

  right() {
    this.direction = 1;
    if (this.index + 1 >= this.messageList.length) {
      this.index = 0;
    } else {
      this.index += 1;
    }
  }

  get cat2Arr() {
    return this.getCat2Arr;
  }

  mounted() {}

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

  enter(el, done) {
    Velocity(el, {
      opacity: 0,
      translateX:  (50 * this.direction) + 'px'
    }, {
      duration: 0,
      complete: done
    })

    Velocity(el, {
      translateX: '0px',
      opacity: 1,
      scale: 1
    }, {
      duration: 300,
      complete: done
    });
  }

  leave(el, done) {

    Velocity(el, {
      opacity: 0,
      scale: 0.8,
      translateX: (50 * this.direction * -1) + 'px'
    }, {
      duration: 300,
      complete: done
    });
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}

// .slide-enter {
//   transform: translateX(20px) scale(1);
//   opacity: 1;
// }

// .slide-leave-to {
//   transform: translateX(-20px) scale(0.8);
//   opacity: 0;
// }

.box {
  width: 100%;
  height: 40px;
  overflow: hidden;
  position: relative;
  text-align: center;
  border: 1px solid;
}

.text {
  width: 100%;
  position: absolute;
  top: 0;
}

.video_con {
  height: 100%;
  text-align: center;
  overflow: hidden;
}
</style>
