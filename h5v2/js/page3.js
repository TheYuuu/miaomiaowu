function page3_run() {
  TweenMax.staggerFrom(['.page_title', '.page_text h3'], 1.1, {
    y: -50,
    opacity: 0,
    ease: Elastic.easeOut
  }, 0.5)
}