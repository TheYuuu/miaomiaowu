class HandleSvg {
  constructor(world, citys, callbacks) {
    this.world = world;
    this.citys = citys;
    this.callbacks = callbacks;
    this.width = $('#earth_svg').width() - 20;
    this.height = $('#earth_svg').height() - 20;

    this.svg = d3.select("#earth_svg")
    this.earththsvg = this.svg.append('g')

    this.asiaPos = {
      scale: 2.306837809675917,
      translate: [-207.71495739351053, -100.44680000892913]
    }

    this.chinaPos = {
      scale: 5.78786421050677,
      translate: [-771.0539735976545, -671.0558260894893]
    }
  }

  drawWorld() {
    let width = this.width;
    let height = this.height;
    let earththsvg = this.earththsvg;
    let world = this.world;

    let projection = d3.geoNaturalEarth1()
      .translate([width / 2 + 10, height / 2])
      .fitSize([width, height], world);

    let path = d3.geoPath(projection);

    earththsvg.selectAll(".block")
      .data(world.features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", 'block')
      .style('display', 'none')
      .style('opacity', 0)

    let ro = -100;
    projection.rotate([ro, 0]);

    this.projection = projection;
    path = d3.geoPath(projection);
    earththsvg.selectAll("path.block").attr("d", path)

    this.zoom = d3.zoom().on("zoom", function () {
      earththsvg.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      earththsvg.attr("transform", d3.event.transform); // updated for d3 v4
    });
  }

  zoomToChina() {
    let that = this;
    return function () {
      let svg = that.svg;
      let zoom = that.zoom;
      let chinaPos = that.chinaPos;
      svg.transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity.translate(chinaPos.translate[0], chinaPos.translate[1]).scale(chinaPos.scale))
    }
  }

  zoomToAsia() {
    let that = this;
    return function () {
      let svg = that.svg;
      let zoom = that.zoom;
      let asiaPos = that.asiaPos;
      svg.transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity.translate(asiaPos.translate[0], asiaPos.translate[1]).scale(asiaPos.scale))
        .on('end', that.zoomToWorld())
    }
  }

  zoomToWorld() {
    let that = this;
    return function () {
      let svg = that.svg;
      let zoom = that.zoom;
      svg.transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity.translate(10, 0).scale(1))
        .on('end', function() {
          that.callbacks[0]();
        })
    }
  }

  drawCitys() {
    let svg = this.svg;
    let citys = this.citys;
    let projection = this.projection;

    let node_svg = svg.append('g');
    node_svg.selectAll('.city_node')
      .data(citys.citys)
      .enter()
      .append('circle')
      .attr('class', 'city_dots')
      .attr("r", 3 / 5.78786421050677)
      .attr("cx", function (d) {
        return projection([d.pos[1], d.pos[0]])[0]
      })
      .attr("cy", function (d) {
        return projection([d.pos[1], d.pos[0]])[1];
      })
      .attr("fill", '#FA543C')
      .attr("stroke", '#F7BFB8')
      .attr("stroke-width", 3 / 5.78786421050677)
      .attr("opacity", 0)
      .style('display', 'none')

    let chinaPos = {
      scale: 5.78786421050677,
      translate: [-771.0539735976545, -671.0558260894893]
    }
    node_svg.attr("transform", d3.zoomIdentity.translate(chinaPos.translate[0], chinaPos.translate[1]).scale(chinaPos.scale));
  }

  removeCityDots() {
    let that = this;
    let projection = this.projection;
    return function () {
      d3.selectAll('.city_num')
        .style("top", '55%')
        .transition()
        .duration(500)
        .style("top", '50%')
        .style("opacity", 0)
        .remove()

      d3.selectAll('.city_dots')
        .transition()
        .duration(800)
        .attr("cy", function (d) {
          return projection([d.pos[1], d.pos[0]])[1] - 20;
        })
        .style("opacity", 0)
        .remove()
        .on('end', that.zoomToAsia())
    }
  }
}