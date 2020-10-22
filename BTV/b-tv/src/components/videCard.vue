<template>
<div class="videCard">
  <el-row class="img_con">
    <img :src="inf.pic">
  </el-row>
  <el-row>
    <h3 class="title">{{ inf.title }}</h3>
    <p class="play-inf">
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
    </p>
  </el-row>
  <span class="description">123</span>
</div>
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
}

.img_con>img {
  height: 70%;
  width: 100%;
}

.title {
  font-size: 1rem;
}

.play-inf {
  font-size: 0.9rem;
}

.description{
  height: 20px;
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap;
  font-size: 0.5rem;
}
</style>
