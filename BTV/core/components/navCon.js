Vue.component('navCon', {
  template: `
  <div class="h-full">
  <el-carousel indicator-position="none" ref="carousel" style="height:100%" :autoplay="false" arrow="nerver">
    <el-carousel-item :name="item.rid"
      v-for="(item, index) in list" :key="JSON.stringify(item) + 'nacCon'">
      <div class="video_con">
        <block :inf="item" />
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
  `,
  props: ['list'],
  data() {
    return {
      activeName: ''
    }
  },
  methods: {
    changeTab(activeName) {
      this.$refs.carousel.setActiveItem(activeName);
    }
  },
  mounted() {
    this.activeName = this.list[0].rid;
  }
})