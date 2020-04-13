<template>
<div id="treeMap">
  <svg id="treeSvg"></svg>
</div>
</template>

<script>
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator';
import echarts from 'echarts';
import * as d3 from 'd3';
import axios from 'axios';
import ChartController from '../assets/TreeChart';

@Component({
  name: 'treeMap'
})
export default class extends Vue {
  @Prop() data;

  mounted() {
    let vm = this;
    axios.get('/api/getRoot').then(d => {
      let width = document.getElementById('treeMap').offsetWidth;
      let height = document.getElementById('treeMap').offsetHeight;
      let chart = new ChartController({
        size: {
          width,
          height
        },
        dirTree: d.data.root,
        domsvg: d3.select('#treeSvg'),
        callback:{
          addNode: vm.addNode(),
          delNode: vm.delNode()
        }
      });
      chart.initCollapseClusterChart2();
      // chart.initCollapseClusterChart();
    })
  }

  addNode() {
    const vm = this;
    return function(nodeId) {
      vm.$bus.$emit("addNode", nodeId);
    }
  }

  delNode() {
    const vm = this;
    return function(nodeId) {
      vm.$bus.$emit("delNode", nodeId);
    }
  }
}
</script>

<style>
#treeMap,
#treeSvg {
  width: 100%;
  height: 100%;
  user-select: none;
  border: 1px solid;
}

.node text {
  font: 10px sans-serif;
}

.node .select {
  stroke: red;
  stroke-width: 1px;
}
</style>
