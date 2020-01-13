class HandleSvg {
  constructor(world, citys, callbacks) {
    this.world = world;
    this.citys = citys;
    this.callbacks = callbacks;
    this.width = $('#earth_svg').width() - 20;
    this.height = $('#earth_svg').height() - 20;

    this.svg = d3.select("#earth_svg")
    this.earththsvg = this.svg.append('g')

    const width =  document.querySelector('.container').offsetWidth;
    const height =  document.querySelector('.container').offsetHeight;

    this.asiaPos = {
      scale: 2.306837809675917,
      translate: [-207.71495739351053 / 335 * width, -100.44680000892913 / 335 * height]
    }

    this.chinaPos = {
      scale: 5.78786421050677,
      translate: [-800.0539735976545 / 335 * width, -550.0558260894893 / 335 * height]
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
      .attr("transform", 'translate(10, 0)')
      .style('display', 'none')
      .style('opacity', 0)

    let ro = -100;
    projection.rotate([ro, 0]);

    this.projection = projection;
    path = d3.geoPath(projection);
    earththsvg.selectAll("path.block").attr("d", path)

    this.zoom = d3.zoom().on("zoom", function () {
      earththsvg.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      earththsvg.attr("transform", d3.event.transform);
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
        .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1))
        .on('end', function() {
          that.callbacks[0]();
        })
    }
  }

  drawCitys() {
    let svg = this.svg;
    let citys = this.citys;
    let projection = this.projection;
    let chinaPos = this.chinaPos;

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
      .attr("transform", 'translate(10, 0)')
      .attr("fill", '#FA543C')
      .attr("stroke", '#F7BFB8')
      .attr("stroke-width", 3 / 5.78786421050677)
      .attr("opacity", 0)
      .style('display', 'none')

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

class AnimationControl {
  constructor() {
    this.tl = new TimelineMax({
      repeat: 0,
      repeatDelay: 0
    });
    this.staticAnimationOn();
  }

  staticAnimationOn() {
    let btn_more = $('.logo-b');
    let commics = $('.comics-play');
    let main = $('.main');

    btn_more.click(function () {
      TweenMax.to(commics, 0.5, {
        left: 0,
        display: 'block'
      })
    });
  }

  showMap(fn) {
    this.tl.add(TweenMax.staggerTo('.block', 0.5, {
      display: 'block',
      opacity: 1,
      rotation: 360
    }, 0.02))
    .addCallback(function () {
      fn();
    });
  }

  addCityDots(fn) {
    this.tl.add(TweenMax.staggerFromTo('.city_dots', 1, {
        cy: -20
      }, {
        delay: 0.8,
        display: 'block',
        opacity: 1,
        cy: 0
      }, 0.05))
      .addCallback(function () {
        TweenMax.to('.city_dots', 2, {
          repeat: -1,
          attr: {
            r: 6 / 5.7878642105067
          },
          yoyo: true,
          yoyoEase: true,
        })
      });

    this.tl.add(TweenMax.fromTo('.city_num', 0.3, {
      x: -20
    }, {
      delay: 0.2,
      x: 0,
      visibility: 'visible',
      opacity: 1
    }));

    this.tl.add(TweenMax.fromTo('.city_num_text_1', 0.5, {
      x: 20
    }, {
      x: 0,
      visibility: 'visible',
      opacity: 1
    }));

    this.tl.add(TweenMax.fromTo('.city_num_text_2', 0.5, {
      x: -20
    }, {
      x: 0,
      visibility: 'visible',
      opacity: 1
    }));

    this.tl.add(TweenMax.fromTo('#city_num', 0.5, {
      y: 20
    }, {
      y: 0,
      visibility: 'visible',
      opacity: 1
    }));

    let num = {
      num: 0
    };
    this.tl.add(TweenMax.to(num, 1, {
      num: 42,
      onUpdate: function () {
        $('#city_num').html(num.num.toFixed(0));
      }
    })).addCallback(function () {
      fn();
    });
  }

  removeCityDots() {
    
  }

  showTuDou() {
    let that = this;
    return function() {
      let tudou = $('.tudou-img');
      that.tl.to([tudou, '.tudou_text1', '.tudou_text2'], 0.1, {
        delay: 0.2,
        visibility: 'visible',
        opacity: 1,
      })
      .to([tudou, '.tudou_text1', '.tudou_text2'], 1, {
        delay: 0.2,
        y: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        startAt: {
          y: -20
        }
      })
    }
  }
}

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    d3.json('./lib/' + fileName).then(data => {
      resolve(data);
    })
  });
};

async function page2_run() {
  TweenMax.staggerFrom(['.page_title', '.page_text'], 1.1, {
    y: -50,
    opacity: 0,
    ease: Elastic.easeOut
  }, 0.5)

  const world = await readFile('world-110m.geojson');
  const citys = await readFile('city.json');

  let animationControl = new AnimationControl();
  let handleSvg = new HandleSvg(world, citys, [
    animationControl.showTuDou()
  ]);
  handleSvg.drawWorld();
  animationControl.showMap(handleSvg.zoomToChina());
  handleSvg.drawCitys();
  animationControl.addCityDots(handleSvg.removeCityDots());
}