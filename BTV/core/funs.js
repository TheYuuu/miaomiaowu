function clear() {
  // $('style').remove();
  // $('link').remove();
  // $('script').remove();

  for(var i = 1; i < 1000; i++) {
    clearInterval(i);
  }

  $('body').remove();
  $('html').append(document.createElement("body"));

  let app = document.createElement("div");
  app.setAttribute('id', 'app')
  $('body').append(app);
}

function init() {
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
        arr: [
          ['1', '1', '1', '1', '1'],
          ['1', '1', '1', '1', '1'],
          ['1', '1', '1', '1', '1'],
          ['1', '1', '1', '1', '1'],
          ['1', '1', '1', '1', '1']
        ]
      }
    },
    mounted() {
      this.inputs = document.getElementsByClassName("chooseAble");
      this.inputs[0].focus();
    },
    methods: {
      keyDown(event) {
        this.inputs = document.getElementsByClassName("chooseAble");
        let focus = document.activeElement;
        let len = this.arr[0].length;
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