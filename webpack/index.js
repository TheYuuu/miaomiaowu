import * as d3 from 'd3'

var svg = d3.select('body').append('svg').attr('width', 500).attr('height', 500);
svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr("r", 20)
    .attr("fill", 'red');