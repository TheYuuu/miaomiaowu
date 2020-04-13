<template>
  <div id="app">
    <div id="tree_view">
      <treeMap></treeMap>
    </div>
    <div id="graph_view">
      <graph></graph>
    </div>
    <codeEdit></codeEdit>
  </div>
</template>


<script>
import { Component, Vue } from 'vue-property-decorator';
import treeMap from './components/treeMap.vue';
import graph from './components/graph.vue';
import codeEdit from './components/codeEdit.vue';
import echarts from 'echarts';

@Component({
  components: { treeMap, graph, codeEdit }
})
export default class extends Vue {
  mounted() {
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
}

#tree_view, #graph_view {
  float: left;
  width: 50%;
  height: 100%;
}
</style>
