class HandleSvg {
  constructor() {
    this.width = $('#earth_svg').width() - 20;
    this.height = $('#earth_svg').height() - 20;

    this.svg = d3.select("#earth_svg")
    this.earththsvg = this.svg.append('g')
      .attr('transform', 'translate(10, 10)')
  }

  drawChina(china) {
    let width = this.width;
    let height = this.height;
    let earththsvg = this.earththsvg;

    let projection = d3.geoMercator()
      .translate([width / 2, height / 2])
      // .center([width / 2, height / 2])
      .fitSize([width, height], china);
    this.projection = projection;

    let path = d3.geoPath(projection);

    earththsvg.selectAll(".block")
      .data(china.features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", 'block')
      .style('display', 'none')
      .style('opacity', 0)
  }

  drawWorld(world) {
    let width = this.width;
    let height = this.height;
    let svg = this.svg;
    let earththsvg = this.earththsvg;

    let projection = d3.geoNaturalEarth1()
      .translate([width / 2, height / 2])
      // .center([width / 2, height / 2])
      .fitSize([width, height], world);
    this.projection = projection;

    let path = d3.geoPath(projection);

    // earththsvg.append("defs").append("path")
    // .datum({type: "Sphere"})
    // .attr("id", "sphere")
    // .attr("d", path)

    // earththsvg.append("use")
    // .attr("class", "stroke")
    // .attr("xlink:href", "#sphere");

    var pathUpdata = svg.selectAll(".block")
      .data(world.features);

    var pathEnter = pathUpdata.enter();

    var pathExit = pathUpdata.exit();

    pathUpdata.transition()
      .duration(500)
      .attr("d", path)

    pathEnter.append("path")
      .attr("class", 'block')
      .transition()
      .duration(500)
      .attr("d", path)

    pathExit.transition()
      .duration(200)
      .attr("fill", "white")
      .remove();
  }

  drawCitys(city) {
    let svg = this.svg;
    let height = this.height;
    let width = this.width;
    let projection = this.projection;

    let node_svg = svg.append('g');
    node_svg.selectAll('.city_node')
      .data(city.citys)
      .enter()
      .append('circle')
      .attr('class', 'city_dots')
      .attr("r", 3)
      .attr("cx", function (d) {
        return projection([d.pos[1], d.pos[0]])[0]
      })
      .attr("cy", function (d) {
        return projection([d.pos[1], d.pos[0]])[1] - 20;
      })
      .attr("fill", '#FA543C')
      .attr("stroke", '#F7BFB8')
      .attr("stroke-width", 3)
      .attr("opacity", 0)
      .style('display', 'none')

    let Xstep = width / 100;
    let Ystep = height / 100;

    // node_svg.append('rect')
    //   .attr('x', Xstep * 16)
    //   .attr('y', Ystep * 55)
    //   .attr('width', Xstep * 25)
    //   .attr('height', Ystep * 15)
    //   .attr('fill', '#FA543C')
      // .style('display', 'none')
      // .attr("opacity", 0)

    // node_svg.append('text')
    //   .attr('x', Xstep * 18)
    //   .attr('y', Ystep * 60)
    //   .text('已服务全国')
    //   .attr('font-size', '12px')
    //   .attr('fill', 'white')

    // node_svg.append('text')
    //   .attr('x', Xstep * 18)
    //   .attr('y', Ystep * 67)
    //   .text('42')
    //   .attr('font-size', '30px')
    //   .attr('fill', 'white')

    // node_svg.append('text')
    //   .attr('x', Xstep * 28)
    //   .attr('y', Ystep * 67)
    //   .text('个城市')
    //   .attr('font-size', '12px')
    //   .attr('fill', 'white')
  }
}