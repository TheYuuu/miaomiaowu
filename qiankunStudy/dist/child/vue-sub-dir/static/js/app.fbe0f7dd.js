(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["vue-sub-app"]=t():e["vue-sub-app"]=t()})(window,(function(){return function(e){function t(t){for(var r,i,a=t[0],c=t[1],s=t[2],p=0,f=[];p<a.length;p++)i=a[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(f.length)f.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},u=[];function i(e){return a.p+"static/js/"+({"About-component":"About-component"}[e]||e)+"."+{"About-component":"18e63489"}[e]+".js"}function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var u,c=document.createElement("script");c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.src=i(e);var s=new Error;u=function(t){c.onerror=c.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+u+")",s.name="ChunkLoadError",s.type=r,s.request=u,n[1](s)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:c})}),12e4);c.onerror=c.onload=u,document.head.appendChild(c)}return Promise.all(t)},a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="//localhost:5500/child/vue-sub-dir/",a.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp_vue-sub"]=window["webpackJsonp_vue-sub"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var p=0;p<c.length;p++)t(c[p]);var l=s;return u.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"bootstrap",(function(){return x})),n.d(t,"mount",(function(){return P})),n.d(t,"unmount",(function(){return k}));n("96cf");var r=n("1da1"),o=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("83f4"),n("2b0e")),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},i=[],a=(n("034f"),n("2877")),c={},s=Object(a["a"])(c,u,i,!1,null,null,null),p=s.exports,l=(n("d3b7"),function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),f=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}})])}],d={name:"Home",components:{}},m=d,v=Object(a["a"])(m,l,f,!1,null,null,null),h=v.exports,b=[{path:"/",name:"Home",component:h},{path:"/about",name:"About",component:function(){return n.e("About-component").then(n.bind(null,"f820"))}}],_=b,w=n("2f62");o["a"].use(w["a"]);var y=new w["a"].Store({state:{},mutations:{},actions:{},modules:{}}),g=n("8c4f");o["a"].use(g["a"]),o["a"].config.productionTip=!1;var j=null;function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.container,n=new g["a"]({base:window.__POWERED_BY_QIANKUN__?"/child/vue-sub":"/child/vue-sub-dir",mode:"history",routes:_});j=new o["a"]({router:n,store:y,render:function(e){return e(p)}}).$mount(t?t.querySelector("#app"):"#app")}function x(){return E.apply(this,arguments)}function E(){return E=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] vue app bootstraped");case 1:case"end":return e.stop()}}),e)}))),E.apply(this,arguments)}function P(e){return A.apply(this,arguments)}function A(){return A=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("[vue] props from main framework",t),O(t);case 2:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}function k(){return N.apply(this,arguments)}function N(){return N=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:j.$destroy(),j.$el.innerHTML="",j=null;case 3:case"end":return e.stop()}}),e)}))),N.apply(this,arguments)}window.__POWERED_BY_QIANKUN__||O()},"83f4":function(e,t,n){(function(){window.__POWERED_BY_QIANKUN__&&(n.p=window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)})()},"85ec":function(e,t,n){},cf05:function(e,t){e.exports="//localhost:5500/child/vue-sub-dir/img/logo.82b9c7a5.png"}})}));
//# sourceMappingURL=app.fbe0f7dd.js.map