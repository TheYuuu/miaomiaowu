import "babel-polyfill";
import { AnimationControl }  from './AnimationControl'
import { HandleSvg }  from './HandleSvg'


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

export {
  page2_run
}