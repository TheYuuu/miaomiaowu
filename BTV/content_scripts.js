window.onload = function () {
  // 简单适配
  var documentEl = document.documentElement;
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  recalc = function () {
    var clientWidth = documentEl.clientWidth;
    if (!clientWidth) return;
    documentEl.style.fontSize = 20 * (clientWidth / 1920) + 'px';
  };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  recalc();
}

for (var i = 1; i < 1000; i++) {
  clearInterval(i);
}

$('body').remove();
$('html').append(document.createElement("body"));

let app = document.createElement("div");
app.setAttribute('id', 'app')
$('body').append(app);

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

// });