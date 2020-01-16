let img2 = $('.tuou_back2')[0];
img2.onload = () => {
  tudou2On()
}
img2.src="./static/tudou2/土豆自白2.png";

function tudou2On() {

  var params = init2();

  var controller = new ScrollMagic.Controller();
  var scene1 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back2', 
    offset: params.qiche.qicheTop - 50, 
    duration: 100 
  }).setTween(".qiche", {
    opacity: 1,
    'left': params.qiche.qicheLeft + 'px',
    'top': params.qiche.qicheTop + 'px'
  })
  
  var scene2 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back2', //触发元素
    offset: params.qiche_text.qichetextTop, 
    duration: 100 
  }).setTween(".qiche_text", {
    opacity: 1,
  })
  
  var scene3 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back2', 
    offset: params.xiaodou.xiaodouTop, 
    duration: 300 
  }).setTween(".xiaodou", {
    opacity: 0.8,
    width: '20%',
    'left': (params.xiaodou.xiaodouLeft + 20 ) + 'px',
    'top': (params.xiaodou.xiaodouTop - 20 ) + 'px'
  })
  
  var scene4 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back2', 
    offset: params.daxian.daxianTop - 100, 
    duration: 200 
  }).setTween(".daxian", {
    opacity: 1,
    'left': params.daxian.daxianLeft + 'px'
  })
  
  var scene4 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back2', 
    offset: params.daxian.daxianTop - 100, 
    duration: 200 
  }).setTween(".daxian", {
    opacity: 1,
    'left': params.daxian.daxianLeft + 'px'
  })
  
  var scene5 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back2', 
    offset: params.dayuan.dayuanTop - 100, 
    duration: 200 
  }).setTween(".dayuan", {
    opacity: 1,
    'left': params.dayuan.dayuanLeft + 'px'
  })
  
  
  controller.addScene(scene1);
  controller.addScene(scene2);
  controller.addScene(scene3);
  controller.addScene(scene4);
  controller.addScene(scene5);
}


function init2() {
  let width = document.querySelector('.tuou_back2').clientWidth;
  let height = document.querySelector('.tuou_back2').clientHeight;
  let qicheTop = 199 / 3321 * height;
  let qicheLeft = 48 / 375 * width;

  let qichetextTop = 220 / 3321 * height;
  let qichetextLeft = 143 / 375 * width;

  let xiaodouTop = 953 / 3321 * height;
  let xiaodouLeft = 225 / 375 * width;

  let daxianTop = 1539 / 3321 * height;
  let daxianLeft = 7.5 / 375 * width;


  let dayuanTop = 1488 / 3321 * height;
  let dayuanLeft = 254 / 375 * width;

  let sleep1Top = 1916 / 3321 * height;
  let sleep1Left = 196 / 375 * width;
  let sleep2Top = 1896 / 3321 * height;
  let sleep2Left = 211 / 375 * width;
  let sleep3Top = 1875 / 3321 * height;
  let sleep3Left = 226 / 375 * width;

  let guguchufangTop = 2395 / 3321 * height;
  let guguchufangLeft = 285 / 375 * width;
  let gugutextTop = 2344 / 3321 * height;
  let gugutextLeft = 237 / 375 * width;

  let haochiccTop = 2491 / 3321 * height;
  let haochiccLeft = 0 / 375 * width;
  let cctextTop = 2437 / 3321 * height;
  let cctextLeft = 5 / 375 * width;

  let last1Top = 2970 / 3321 * height;
  let last1Left = 30 / 375 * width;
  let last2Top = 2896 / 3321 * height;
  let last2Left = 75 / 375 * width;
  let last3Top = 2878 / 3321 * height;
  let last3Left = 157 / 375 * width;
  let last4Top = 2950 / 3321 * height;
  let last4Left = 264 / 375 * width;

  $('.qiche').css("top", qicheTop - 50);
  $('.qiche').css("left", qicheLeft + 50);

  $('.qiche_text').css("top", qichetextTop);
  $('.qiche_text').css("left", qichetextLeft);

  $('.xiaodou').css("top", xiaodouTop);
  $('.xiaodou').css("left", xiaodouLeft);

  $('.daxian').css("top", daxianTop);
  $('.daxian').css("left", daxianLeft - 20);

  $('.dayuan').css("top", dayuanTop);
  $('.dayuan').css("left", dayuanLeft + 20);

  $('.sleepz1').css("top", sleep1Top);
  $('.sleepz1').css("left", sleep1Left);
  $('.sleepz2').css("top", sleep2Top);
  $('.sleepz2').css("left", sleep2Left);  
  $('.sleepz3').css("top", sleep3Top);
  $('.sleepz3').css("left", sleep3Left);

  $('.guguchufang').css("top", guguchufangTop);
  $('.guguchufang').css("left", guguchufangLeft);
  $('.gugutext').css("top", gugutextTop);
  $('.gugutext').css("left", gugutextLeft);

  $('.haochicc').css("top", haochiccTop);
  $('.haochicc').css("left", haochiccLeft);
  $('.cctext').css("top", cctextTop);
  $('.cctext').css("left", cctextLeft);

  $('.last1').css("top", last1Top);
  $('.last1').css("left", last1Left);
  $('.last2').css("top", last2Top);
  $('.last2').css("left", last2Left);
  $('.last3').css("top", last3Top);
  $('.last3').css("left", last3Left);
  $('.last4').css("top", last4Top);
  $('.last4').css("left", last4Left);

  return {
    qiche: {
      qicheTop,
      qicheLeft
    },
    qiche_text: {
      qichetextTop,
      qichetextLeft
    },
    xiaodou: {
      xiaodouTop,
      xiaodouLeft
    },
    daxian: {
      daxianTop,
      daxianLeft
    },
    dayuan: {
      dayuanTop,
      dayuanLeft
    }
  }
}