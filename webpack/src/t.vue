<template>
  <div id="app">
    <span>hello the yu!</span>
  </div>
</template>

<script>
import * as d3 from 'd3'

var svg = d3.select('body').append('svg').attr('width', 500).attr('height', 500);
svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr("r", 20)
    .attr("fill", 'red');
</script>

<style lang="less" scoped>
#app {
  background: red;
}
</style>