
    var params = init();

    $('.tudou').click(function(){
      TweenMax.to('.tudou', 1, {
        opacity: 1
      })
      TweenMax.fromTo('.todou_container', 1, {
        'z-index': 20,
      },{
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

    controller.addScene(scene1);
    controller.addScene(scene2);
    controller.addScene(scene3);


    function init() {
      let width = document.querySelector('.tuou_back1').clientWidth;
      let height = document.querySelector('.tuou_back1').clientHeight;
      let rainTop = 1502 / 3108 * height;
      let rainLeft = 101 / 375 * width;

      let yeyeTop = 1908 / 3108 * height;
      let yeyeLeft = 37 / 375 * width;

      let shougouTop = 2525 / 3108 * height;
      let shougouLeft = 71 / 375 * width;

      $('.rain').css("top", rainTop)
      $('.yeye').css("top", yeyeTop)  
      $('.yeye').css("left", yeyeLeft)
      $('.shougou').css("top", shougouTop)  
      $('.shougou').css("left", shougouLeft + 100)

      return {
        rain : {
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
        }
      }
    }