<template>
<div id="graph_div">
</div>
</template>

<script>
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator';
import echarts from 'echarts';
import axios from 'axios';

@Component({
  name: 'treeMap'
})
export default class extends Vue {
  oriNodes = [];
  selectNodes = [];
  links = [];
  option =  null;
  myChart = null;

  created() {
    const vm = this;
    vm.$bus.$on("addNode", (nodeId) => {
      vm.selectNodes = vm.selectNodes.concat(
        vm.oriNodes.filter(item => item.id === String(nodeId))
      );
      vm.updataGraph();
    });

    vm.$bus.$on("delNode", (nodeId) => {
      let index = vm.selectNodes.find((e,i) => {
        return +e.id === +nodeId
      });
      if (index) {
        vm.selectNodes.splice(index, 1);
      }
      vm.updataGraph();
    });
  }

  mounted() {
    let vm = this;
    vm.myChart = echarts.init(document.getElementById("graph_div"));

    axios.get('/api/getNodeLink').then(d => {
      vm.oriNodes = d.data.nodes;
      vm.links = d.data.links.map(v => {
        v.label = {
          show: true,
          formatter: (Object) => {
            return Object.data.values.join(",");
          }
        }
        return v;
      });
      vm.updataGraph();
    });
  }

  updataGraph() {
    let {
      selectNodes,
      oriNodes,
      links,
      dom,
      option,
      myChart
    } = this;

    var app = {};

    option = {
      title: {
        text: '依赖关系'
      },
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          // gravity: 10,
          repulsion: 1000,
          edgeLength: 200
        },
        draggable: true,
        symbolSize: 50,
        roam: true,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: selectNodes,
        // links: [],
        links: links,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }]
    };
    if (!myChart) {
      myChart = echarts.init(document.getElementById("graph_div"));
    }
    if (option && typeof option === "object") {
      console.log(option);
      myChart.setOption(option, true);
    }
  }
}
</script>

<style lang="scss">
#graph_div {
  width: 100%;
  height: 100%;
  user-select: none;
  border: 1px solid;
}
</style>
