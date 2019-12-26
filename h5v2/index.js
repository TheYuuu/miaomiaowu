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
  'width': '2rem',
  'top': '10%'
}), TweenMax.fromTo('.bu_title', 1, {
  'top': '110%',
  'color': '#F2341A',
}, {
  'top': '99%',
  'color': '#F2341A',
}))

tl.add(TweenMax.to('.bu_logo', 1, {
  x: -100,
})).fromTo('.title-list-item', 1, {
  x: -100
}, {
  x: 0,
  opacity: 1
})