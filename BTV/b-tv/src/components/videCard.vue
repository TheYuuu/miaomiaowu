<template>
<el-card>
  <el-row class="img_con">
    <img :src="inf.pic">
  </el-row>
  <el-row>
    <h3 class="title text-left">{{ inf.title }}</h3>
  </el-row>
  <el-row class="play-inf">
    <el-col :span="12">
      <span>
        <i class="el-icon-video-play"></i>
        {{ inf.play }}
      </span>
    </el-col>
    <el-col :span="12">
      <span>
        <i class="el-icon-chat-dot-round"></i>
        {{ inf.video_review }}
      </span>
    </el-col>
  </el-row>
  <p class="description">{{ inf.description }}</p>
</el-card>
</template>

<script>
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';

@Component({
  name: 'videCard',
  components: {}
})
export default class extends Vue {
  @Prop() inf;

  mounted() {
    // console.log(this.inf)
  }
}
</script>

<style lang="scss">
.videCard {
  height: 0;
  padding-bottom: 100%;
  position: relative;
  background: white;
}

.img_con {
  width: 100%;
  height: 0;
  padding-top: 60%;
}

.img_con>img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  height: 40px;
  line-height: 20px;
  margin: 5px;
}

.play-inf {
  font-size: 0.5rem;
  margin: 5px;
}

.description {
  height: 3.5rem;
  padding: 5px;
  text-align: left;
  overflow: hidden;
  word-break: break-all;
  font-size: 0.5rem;
  text-indent: 1rem;
}
</style>
