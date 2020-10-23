<template>
<!-- <div class="videCard"> -->
<el-card>
  <el-row class="img_con">
    <img :src="inf.pic">
  </el-row>
  <el-row>
    <h3 class="title">{{ inf.title }}</h3>
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
<!-- </div> -->
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

.img_con>img {
  height: 10vw;
}

.title {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  height: 40px;
  line-height: 20px;
}

.play-inf {
  font-size: 0.5rem;
  padding: 5px 20px;
}

.description {
  height: 3.5rem;
  padding: 5px;
  text-align: left;
  overflow: hidden;
  font-size: 0.5rem;
  text-indent: 0.5rem;
}
</style>
