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
  handleSvg.drawChina(china);
  handleSvg.drawCitys(citys);
  handleSvg.drawWorld(map);
}

run()