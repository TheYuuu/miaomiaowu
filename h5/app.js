const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    d3.json('./static/' + fileName).then(data => {
      resolve(data);
    })
  });
};

async function run() {
  const china = await readFile('china.json');
  const map = await readFile('map.json');
  const citys = await readFile('city.json');

  let handleSvg = new HandleSvg();
  let animationControl = new AnimationControl();
  handleSvg.drawChina(china);
  animationControl.addChinaMap();

  handleSvg.drawCitys(citys);
  animationControl.addCityDots();

  // handleSvg.drawWorld(map);
}

run()