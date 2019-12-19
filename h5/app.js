const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    d3.json('./static/' + fileName).then(data => {
      resolve(data);
    })
  });
};

async function run() {
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

run()