import { page1_run } from './js/page1'
import { page2_run } from './js/page2'
import { page3_run } from './js/page3'

import './css/page1.css'
import './css/page2.css'
import './css/page3.css'
import './css/style.css'
import './css/tudou.css'

import { tudou1On } from './js/tudou1'
import { tudou2On } from './js/tudou2'
import { tudou3On } from './js/tudou3'


let page1On = false;
let page2On = false;
let page3On = false;

let imgList = [
  './static/574603024_medium.jpg',
  './static/670691314_huge1.jpg',
  './static/670691314_huge2.jpg',
  './static/tudou1/rain.png',
  './static/tudou1/yeye.png',
  './static/tudou1/shougou.png',
  './static/tudou1/haha.png',
  './static/tudou1/youxiu.png',
  './static/tudou1/item1.png',
  './static/tudou1/item2.png',
  './static/tudou1/item3.png',
  './static/tudou1/item4.png',
  './static/tudou1/item5.png',
  './static/tudou2/qiche.png',
  './static/tudou2/qiche_text.png',
  './static/tudou2/xiaodou.png',
  './static/tudou2/daxian.png',
  './static/tudou2/dayuan.png',
  './static/tudou2/sleepz.png',
  './static/tudou2/guguchufang.png',
  './static/tudou2/gugutext.png',
  './static/tudou2/haochicc.png',
  './static/tudou2/cctext.png',
  './static/tudou2/last1.png',
  './static/tudou2/last2.png',
  './static/tudou2/last3.png',
  './static/tudou2/last4.png',
  './static/tudou3/dadou.png',
  './static/tudou3/hand.png',
  './static/tudou3/tudouhand.png',
  './static/tudou1/土豆自白.jpg',
  './static/tudou2/土豆自白2.jpg',
  './static/tudou3/土豆自白3.jpg',
  './static/t.png'
];

Promise.all(imgList.map(item => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = item;
    img.onload = function () {
      resolve('done')
    }
  })
})).then(_ => {
  window.mtlogoT.kill();
  window.kllogoT.kill()
  TweenMax.to(kllogo, 0.2, {
    y: 0
  })
  TweenMax.to(mtlogo, 0.2, {
    y: 0
  })

  $('.swiper-slide1').css("background-image","url(./static/574603024_medium.jpg)")
  $('.swiper-slide2').css("background-image","url(./static/670691314_huge1.jpg)");
  $('.swiper-slide3').css("background-image","url(./static/670691314_huge2.jpg)");

  tudou1On();
  tudou2On();
  tudou3On();

  
  if (!page1On) {
    page1On = true;
    setTimeout(()=>{
      page1_run();
    }, 500)
  }

  if (!page2On) {
    page2On = true;
    setTimeout(()=>{
      page2_run();
    }, 1500)
  }

  let swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    on: {
      slideChangeTransitionEnd: function () {
        if (this.activeIndex === 2) {
          if (!page3On) {
            page3On = true;
            page3_run();
          }
        }
      }
    }
  });
});


(function (doc, win) {
  var baseRatio = 16 / 9 + 0.001;

  var minRatio = 1.4;
  var maxRatio = 2.2;

  var format = 'page';
  var clientInfo = window.clientInfo = {};
  var maxClientWidth = 640;

  var docEl = doc.documentElement,
    recalc = function () {
      var fontSize = null;
      var clientWidth = docEl.clientWidth;
      var clientHeight = docEl.clientHeight;
      if (clientWidth > maxClientWidth) clientWidth = maxClientWidth;
      if (!clientWidth) return;
      var ratio = clientHeight / clientWidth;

      if (format === 'page') {
        if (ratio < minRatio) {
          clientWidth = clientWidth * ratio / minRatio
          ratio = minRatio;
        } else if (ratio > maxRatio) {
          clientHeight = clientHeight / ratio * maxRatio;
          ratio = maxRatio
        }
      }

      if (ratio > baseRatio && format === 'page') {
        fontSize = clientHeight / baseRatio / 10;
      } else {
        fontSize = clientWidth / 10;
      }

      if (format === 'page') {
        var wrapEle = doc.querySelector('.format-page .n-act .wrap');
        if (wrapEle) {
          var tLeft = -(fontSize - clientWidth / 10) * 5;
          var tTop = -Math.round((17.77777778 * fontSize - clientHeight) / 2);
          wrapEle.style.webkitTransform = 'translate(' + tLeft + 'px,' + tTop + 'px)';
          wrapEle.style.transform = 'translate(' + tLeft + 'px,' + tTop + 'px)';
        }
      }

      clientInfo.clientWidth = clientWidth;
      clientInfo.clientHeight = clientHeight;
      clientInfo.fontSize = fontSize;
      clientInfo.baseRatio = baseRatio;

      docEl.style.fontSize = fontSize + 'px';

      var realfz = parseFloat(win.getComputedStyle(doc.getElementsByTagName("html")[0]).fontSize) || fontSize;
      if (Math.abs(fontSize - realfz) > 1) {
        docEl.style.fontSize = fontSize * (fontSize / realfz) + "px";
      }
      document.body.style.opacity = 1;
    };

  if (!doc.addEventListener) return;
  var resizeTimer;
  if (format !== 'page') {
    window.addEventListener('resize', function () {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        recalc();
      }, 200);
    });
  }

  doc.addEventListener('DOMContentLoaded', recalc, false);

  // $(window).scroll(function () {
  //   var scrollTop = $(this).scrollTop();
  //   var scrollHeight = $('.todou_container').height();
  //   var windowHeight = $(this).height();
  //   if (scrollTop + windowHeight >= scrollHeight + 200) {
  //     let swiper = new Swiper('.swiper-container', {
  //       direction: 'vertical',
  //       on: {
  //         slideChangeTransitionEnd: function () {
  //           if (this.activeIndex === 1) {
  //             if (!page1On) {
  //               page1On = true;
  //               page1_run();
  //             }
  //           }
  //           if (this.activeIndex === 2) {
  //             if (!page2On) {
  //               page2On = true;
  //               page2_run();
  //             }
  //           }
  //           if (this.activeIndex === 3) {
  //             if (!page3On) {
  //               page3On = true;
  //               page3_run();
  //             }
  //           }
  //         },
  //       }
  //     });
  //     TweenMax.to('.todou_container', 0.5, {
  //       y: -500,
  //       onComplete:function(){
  //         $('.todou_container').remove();
  //         setTimeout(()=>{
  //           swiper.slideTo(1, 500);
  //         }, 200);
  //       }
  //     })
  //   }
  // });
})(document, window);