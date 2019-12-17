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