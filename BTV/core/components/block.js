Vue.component('block', {
  template: `
    <div>
      <choose-able-matrix :matrix="randomArr">
        <template v-slot:default="slotProps">
          <videCard :inf="slotProps.item" />
        </template>
      </choose-able-matrix>
    </div>
  `,
  props: ['inf'],
  data() {
    return {
      randomArr: []
    }
  },
  methods: {
  },
  created() {
    // console.log(this.inf);
    const vm = this;
    axios.get('./data/random.json').then(({data: {data}}) => {
      let index = 0;

      while(index < data.archives.length) {
        vm.randomArr.push(data.archives.slice(index, index += 4));
      }
      console.log(vm.randomArr)
    });
  },
  mounted() {
  }
})


// 视频卡片
Vue.component('videCard', {
  template: `
    <div class="videCard">
      <img :src="inf.pic">
    </div>
  `,
  props: ['inf'],
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
    console.log(this.inf)
  },
  mounted() {
  }
})