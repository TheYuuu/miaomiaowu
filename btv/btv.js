// ==UserScript==
// @name         bilibili TV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/
// @grant        none
// ==/UserScript==
function loadScript(url) {
  return new Promise((resolve)=> {
    var scrs = document.getElementsByTagName('script');
    var last = scrs[scrs.length - 1];
    var scr = document.createElement('script');
    scr.src = url;
    scr.async = true;
    last.parentNode.insertBefore(scr, last);

    scr.onload = function() {
      resolve();
    }
  })
}


async function run() {
  await loadScript('https://unpkg.com/vue/dist/vue.js');
  await loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');

  new Vue({
    el: '#app',
    template: `
      <div v-on:keydown="keyDown($event)">
        <div v-for="(item, index) in arr" :key="index" class="flex_con">
          <div v-for="(mm, index) in item" :key="index" class="chooseAble" tabindex="0">
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        arr: [['1', '1', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '1', '1', '1', '1']]
      }
    },
    mounted() {
      this.inputs = document.getElementsByClassName("chooseAble"); 
      this.inputs[0].focus();
      console.log(this.inputs[0])
    },
    methods: {
      keyDown(event) {
        this.inputs = document.getElementsByClassName("chooseAble");
        let focus = document.activeElement;
        let len  = this.arr[0].length;
        event = window.event || event;
        let key = event.keyCode;
        for (var i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i] === focus) break;
        }
        switch (key) {
          case 37:
            if (i > 0) this.inputs[i - 1].focus();
            break;
          case 38:
            if (i - len >= 0) this.inputs[i - len].focus();
            break;
          case 39:
            if (i < this.inputs.length - 1) this.inputs[i + 1].focus();
            break;
          case 40:
            if (i + len < this.inputs.length) this.inputs[i + len].focus();
            break;
        }
      }
    }
  })
}

(function() {
  run();
  // console.log('TVcode: ')
  // axios.defaults.withCredentials = true;
  // axios.get('https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=14970211&type_list=8,512,4097,4098,4099,4100,4101', {
  //   headers: {
  //     "Cookie": document.cookie,
  //   }
  // }).then(({data: {data}})=> {
  //     console.log(data);
  // });
})();