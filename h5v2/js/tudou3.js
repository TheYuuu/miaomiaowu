function tudou3On() {
  $('.tuou_back3')[0].src="./static/tudou3/土豆自白3.png";
  var params = init3();
  var controller = new ScrollMagic.Controller();
  var scene1 = new ScrollMagic.Scene({
    triggerElement: '.tuou_back3',
    offset: params.tudouhand.tudouhandTop,
    duration: 300
  }).setClassToggle(".tudouhand", 'tudouhand-active')
  
  controller.addScene(scene1);
}


function init3() {
  let width = document.querySelector('.tuou_back3').clientWidth;
  let height = document.querySelector('.tuou_back3').clientHeight;

  let dadouTop = 720 / 2772 * height;
  let dadouLeft = 204 / 375 * width;

  let handTop = 824 / 2772 * height;
  let handLeft = 183 / 375 * width;

  let tudouhandTop = 2412 / 2772 * height;
  let tudouhandLeft = 199 / 375 * width;

  $('.dadou').css("top", dadouTop);
  $('.dadou').css("left", dadouLeft);

  $('.hand').css("top", handTop);
  $('.hand').css("left", handLeft);

  $('.tudouhand').css("top", tudouhandTop);
  $('.tudouhand').css("left", tudouhandLeft);

  return {
    tudouhand: {
      tudouhandTop,
      tudouhandLeft
    }
  }
}

export {
  tudou3On
}