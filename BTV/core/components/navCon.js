Vue.component('navCon', {
  template: `
  <div>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane :label="item.name" :name="item.rid"
      v-for="(item, index) in list" :key="JSON.stringify(item) + 'nacCon'">
      {{ item.name }}
    </el-tab-pane>
  </el-tabs>
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
      this.activeName = activeName;
    }
  },
  mounted() {
    this.activeName = this.list[0].rid;
  }
})