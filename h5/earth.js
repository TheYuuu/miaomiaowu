class HandleSvg {
  constructor() {
    this.width = $('#earth_svg').width();
    this.height = $('#earth_svg').height();

    this.svg = d3.select("#earth_svg")
    this.earththsvg = this.svg.append('g')
  }

  drawChina(china) {
    let width = this.width;
    let height = this.height;
    let svg = this.svg;
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
    let projection = this.projection;

    let node_svg = svg.append('g');
    node_svg.selectAll('.city_node')
      .data(city.citys)
      .enter()
      .append('circle')
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
      .transition()
      .duration(1000)
      .attr("cy", function (d) {
        return projection([d.pos[1], d.pos[0]])[1];
      })
      .attr("opacity", 1)
  }
}