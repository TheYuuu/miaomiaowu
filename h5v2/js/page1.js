function page1_On() {
  let tl = new TimelineMax({
    repeat: 0,
    repeatDelay: 0
  });
  
  tl.add(background_block())
    .add(brand())
    .add(page1Content())
}

function background_block() {
  var tl = new TimelineLite();
  // 背景缩上去
  tl.add(TweenMax.to('.background_block', 1, {
    'height': '40%',
    'top': '-20%',
    'width': '110%',
    'border-radius': '50%',
  }), TweenMax.to('.bu_logo', 1, {
    opacity: 1,
    'width': '6rem',
    'top': '10%'
  }), TweenMax.fromTo('.bu_title', 1, {
    'top': '110%',
    'color': '#F2341A',
  }, {
    opacity: 1,
    'top': '99%',
    'color': '#F2341A',
  }))
  return tl;
}

function brand() {
  var tl = new TimelineLite();
  let text_g = [];
  for (let i = 16; i <= 126; i += 2) {
    text_g.push('#path' + i);
  }

  tl.add(TweenMax.fromTo(text_g, 1, {
    'fill': '#rgba(255, 255, 255, 0)',
    'stroke': 'rgba(255, 255, 255, 0)',
    'stroke-dashoffset': 200,
    'stroke-dasharray': 100
  }, {
    'fill': 'rgba(255, 255, 255, 0)',
    'stroke': 'white',
    'stroke-dashoffset': 0
  })).add(TweenMax.to(text_g, 0.5, {
    'fill': 'white',
    'stroke': 'none',
  }))
  return tl;
}

function page1Content() {
  var tl = new TimelineLite();
  tl.from('.title-list', 0.4, {
      opacity: 1,
      scale: 0,
      ease: Power1.easeInOut
    })
    .from('.title-list', 0.3, {
      opacity: 1,
      rotation: 90,
      ease: Power1.easeInOut
    }, 0)
    .staggerFrom(".title-list-item", 1.1, {
      y: -50,
      opacity: 0,
      ease: Elastic.easeOut
    }, 0.5)
    .addLabel("out", "+=1")
    // .to('.tudou', 0.3 , {
    //   rotationY:180, 
    //   transformOrigin:"50% 0%", 
    //   ease: Cubic.easeOut,
    //   yoyo: true,
    //   repeat: 1
    // })
  return tl;
}