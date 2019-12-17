let tudou = $('.tudou-img');

TweenMax.to(tudou, 1, {
  y: 10,
  repeat: -1,
  yoyo: true,
  yoyoEase: true,
  startAt: {
    y: -20
  }
});

let btn_more = $('.logo-b');
let commics = $('.comics-play');
let main = $('.main');

btn_more.click(function () {
  TweenMax.to(commics, 0.5, {
    left: 0,
    display: 'block'
  })
});

d3.json('./static/china.json').then(world => {
  const width = $('#earth_svg').width();
  const height = $('#earth_svg').height();

  var svg = d3.select("#earth_svg")
  var earththsvg = svg.append('g')

  var projection = d3.geoMercator()
  .translate([width / 2, height / 2])
  // .center([width / 2, height / 2])
  .fitSize([width, height], world);

  var path = d3.geoPath(projection);

  earththsvg.selectAll(".block")
    .data(world.features)
    .enter().append("path")
    .attr("d", path)
    .attr("class", 'block')

  d3.json('./static/city.json').then(city=>{
    console.log(city);
  })
})