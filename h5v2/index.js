let tl = new TimelineMax({
  repeat: 0,
  repeatDelay: 0
});

// 背景缩上去
tl.add(TweenMax.to('.background_block', 1, {
  'height': '40%',
  'top': '-20%',
  'width': '110%',
  'border-radius': '50%',
}), TweenMax.to('.bu_logo', 1, {
  'width': '6rem',
  'top': '10%'
}), TweenMax.fromTo('.bu_title', 1, {
  'top': '110%',
  'color': '#F2341A',
}, {
  'top': '99%',
  'color': '#F2341A',
}))

let text_g = [];
for (let i = 16; i <= 126; i+=2) {
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


tl.add(TweenMax.fromTo('.title-list-item', 1, {
  x: -50
}, {
  x: 0,
  opacity: 1
}))
