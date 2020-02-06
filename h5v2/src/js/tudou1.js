function tudou1On() {
  // $('.tuou_back1')[0].src="./static/tudou1/土豆自白.jpg";
  
  var params = init1();
  $('.tudou').click(function () {
    TweenMax.to('.tudou', 1, {
      opacity: 1
    })
    TweenMax.fromTo('.todou_container', 1, {
      'z-index': 20,
    }, {
      ease: Power1.easeInOut,
      opacity: 1
    })
  })
  
  var controller = new ScrollMagic.Controller();
  var scene1 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1', //触发元素
    offset: params.rain.rainTop, //从开始点滚动多少px触发（施法前摇）
    duration: 300 //效果持续的距离（法术持续时间/距离）
  }).setTween(".rain", {
    opacity: 1,
    'left': params.rain.rainLeft + 'px'
  })
  
  var scene2 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.yeye.yeyeTop,
    duration: 300
  }).setClassToggle(".yeye", 'yeye-active')
  
  var scene3 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.shougou.shougouTop - 100,
    duration: 300
  }).setTween(".shougou", {
    opacity: 1,
    'left': params.shougou.shougouLeft + 'px'
  })
  
  var scene4 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.haha.hahaTop,
    duration: 300
  }).setClassToggle(".haha", 'yeye-active')
  
  var scene5 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.youxiu.youxiuTop - 100,
    duration: 200
  }).setTween(".youxiu", {
    opacity: 1,
    'top': params.youxiu.youxiuTop + 'px'
  })
  
  var scene6 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.youxiu.youxiuTop - 100,
    duration: 500
  }).setClassToggle(".item1", 'item1-active')
  var scene7 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.youxiu.youxiuTop - 100,
    duration: 500
  }).setClassToggle(".item2", 'item2-active')
  var scene8 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.youxiu.youxiuTop - 100,
    duration: 500
  }).setClassToggle(".item3", 'item3-active')
  var scene9 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.youxiu.youxiuTop - 100,
    duration: 500
  }).setClassToggle(".item4", 'item4-active')
  var scene10 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back1',
    offset: params.youxiu.youxiuTop - 100,
    duration: 500
  }).setClassToggle(".item5", 'item5-active')
  
  controller.addScene(scene1);
  controller.addScene(scene2);
  controller.addScene(scene3);
  controller.addScene(scene4);
  controller.addScene(scene5);
  controller.addScene(scene6);
  controller.addScene(scene7);
  controller.addScene(scene8);
  controller.addScene(scene9);
  controller.addScene(scene10);
}

function init1() {
  let width = document.querySelector('.tuou_back1').clientWidth;
  let height = document.querySelector('.tuou_back1').clientHeight;

  let rainTop = 1502 / 3108 * height;
  let rainLeft = 101 / 375 * width;

  let yeyeTop = 1908 / 3108 * height;
  let yeyeLeft = 37 / 375 * width;

  let shougouTop = 2525 / 3108 * height;
  let shougouLeft = 71 / 375 * width;

  let hahaTop = 793 / 3108 * height;
  let hahaLeft = 48 / 375 * width;

  let youxiuTop = 1135 / 3108 * height;
  let youxiuLeft = 96 / 375 * width;

  newAnimX(37 / 375 * width, 280 / 375 * width)
  newAnimY(1165 / 3108 * height, 1210 / 3108 * height)
  let item1Top = 1232 / 3108 * height;
  let item1Left = 37 / 375 * width;
  let item2Top = 1187 / 3108 * height;
  let item2Left = 61 / 375 * width;
  let item3Top = 1178 / 3108 * height;
  let item3Left = 123 / 375 * width;
  let item4Top = 1179 / 3108 * height;
  let item4Left = 200 / 375 * width;
  let item5Top = 1200 / 3108 * height;
  let item5Left = 251 / 375 * width;

  $('.rain').css("top", rainTop)
  $('.yeye').css("top", yeyeTop)
  $('.yeye').css("left", yeyeLeft)
  $('.shougou').css("top", shougouTop)
  $('.shougou').css("left", shougouLeft + 100)
  $('.haha').css("top", hahaTop)
  $('.haha').css("left", hahaLeft)
  $('.youxiu').css("top", youxiuTop - 100)
  $('.youxiu').css("left", youxiuLeft)
  $('.item1').css("top", item1Top)
  $('.item1').css("left", item1Left)
  $('.item2').css("top", item2Top)
  $('.item2').css("left", item2Left)
  $('.item3').css("top", item3Top)
  $('.item3').css("left", item3Left)
  $('.item4').css("top", item4Top)
  $('.item4').css("left", item4Left)
  $('.item5').css("top", item5Top)
  $('.item5').css("left", item5Left)

  return {
    rain: {
      rainTop,
      rainLeft
    },
    yeye: {
      yeyeTop,
      yeyeLeft
    },
    shougou: {
      shougouTop,
      shougouLeft
    },
    haha: {
      hahaTop,
      hahaLeft
    },
    youxiu: {
      youxiuTop,
      youxiuLeft
    }
  }
}


function newAnimX(left1, left2) {
  const runkeyframes =`@keyframes animX {
    0% {
      left: ${left1}px;
    }
  
    100% {
      left: ${left2}px;
    }
  }`
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = runkeyframes;
  $('head')[0].append(style);
}

function newAnimY(top1, top2) {
  const runkeyframes =`@keyframes animY {
    0% {
      top: ${top1}px;
    }
  
    100% {
      top: ${top2}px;
    }
  }`
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = runkeyframes;
  $('head')[0].append(style);
}

export {
  tudou1On
}