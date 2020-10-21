Vue.component('chooseAbleMatrix', {
  template: `
  <div>
  <div v-for="(col, index) in matrix" :key="JSON.stringify(col)" class="flex_con pad_con">
    <div v-for="(item, index) in col" :key="item.name" class="box-card chooseAble" tabindex="0">
      <slot v-bind:item="item"></slot>
    </div>
  </div>
</div>
  `,
  props: ['matrix'],
  data() {
    return {
      activeName: ''
    }
  },
  methods: {
  },
  created() {
    console.log(this.matrix);
  },
  mounted() {
  }
})