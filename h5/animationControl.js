class AnimationControl {
  constructor() {
    this.tl = new TimelineMax({
      repeat: 0,
      repeatDelay: 0
    });
    this.staticAnimationOn();
  }

  staticAnimationOn() {
    let btn_more = $('.logo-b');
    let commics = $('.comics-play');
    let main = $('.main');

    btn_more.click(function () {
      TweenMax.to(commics, 0.5, {
        left: 0,
        display: 'block'
      })
    });
  }

  addChinaMap() {
    this.tl.add(TweenMax.staggerTo('.block', 1, {
      display: 'block',
      opacity: 1,
      rotation: 360
    }, 0.05));
  }

  addCityDots() {
    this.tl.add(TweenMax.staggerFromTo('.city_dots', 1, {
        cy: -20
      }, {
        display: 'block',
        opacity: 1,
        cy: 0
      }, 0.05))
      .addCallback(function () {
        TweenMax.to('.city_dots', 2, {
          repeat: -1,
          attr: {
            r: 6
          },
          yoyo: true,
          yoyoEase: true,
        })
      });

    this.tl.add(TweenMax.fromTo('.city_num', 1, {
      x: -20
    }, {
      delay: 0.2,
      x: 0,
      visibility: 'visible',
      opacity: 1
    }));

    this.tl.add(TweenMax.fromTo('.city_num_text_1', 0.5, {
      x: 20
    }, {
      x: 0,
      visibility: 'visible',
      opacity: 1
    }));

    this.tl.add(TweenMax.fromTo('.city_num_text_2', 0.5, {
      x: -20
    }, {
      x: 0,
      visibility: 'visible',
      opacity: 1
    }));

    this.tl.add(TweenMax.fromTo('#city_num', 0.5, {
      y: 20
    }, {
      y: 0,
      visibility: 'visible',
      opacity: 1
    }));

    let num = {
      num: 0
    };
    this.tl.add(TweenMax.to(num, 1, {
      num: 42,
      onUpdate: function () {
        $('#city_num').html(num.num.toFixed(0));
      }
    }));

    let tudou = $('.tudou-img');
    this.tl.to(tudou, 0.1, {
      delay: 0.2,
      visibility: 'visible',
      opacity: 1,
    }).to(tudou, 1, {
      delay: 0.2,
      y: 10,
      repeat: -1,
      yoyo: true,
      yoyoEase: true,
      startAt: {
        y: -20
      }
    })
  }
}