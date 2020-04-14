<template>
<div id="treeMap">
  <div class="toolBox">
    <el-col :span="20">
      <div class="grid-content bg-purple">
        <el-select v-model="modules" filterable placeholder="请选择模块" size="mini" style="margin-right:10px">
          <el-option
            v-for="item in moduleList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button size="mini">确定</el-button>
      </div>
    </el-col>
  </div>

  <svg id="treeSvg">
    <defs>
      <pattern v-for="item in icons" :key="item.id"
        :id="item.id" width="100%" height="100%" patternContentUnits="objectBoundingBox">
        <image width="1" height="1" :xlink:href="item.url"/>
      </pattern>
    </defs>
  </svg>
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
  icons = [];
  modules = '';
  moduleList = [];

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
    });

    axios.get('/api/fileTypes').then(({ data }) => {
      vm.icons = data.fileTypes.map(item => {
        return {
          id: item + '_icon',
          url: require(`../assets/icons/${item}.svg`)
        }
      });
    });
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
#treeMap, #treeSvg {
  width: 100%;
  height: 100%;
}

#treeSvg {
  transform: translate3d(0, 0, 0);
}

#treeMap {
  position: relative;
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

.toolBox {
  position: absolute;
  z-index: 10;
  width: 100%;
  padding: 10px;
}

</style>
