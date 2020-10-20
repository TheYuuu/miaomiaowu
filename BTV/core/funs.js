function clear() {
  // $('style').remove();
  // $('link').remove();
  // $('script').remove();

  for (var i = 1; i < 1000; i++) {
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
      <div v-on:keydown="keyDown($event)" class="h-full">
        <el-container class="h-full">
          <el-header>
            <div v-for="(item, index) in padArr" :key="JSON.stringify(item)" class="flex_con pad_con">
              <el-card v-for="(mm, index) in item" :key="mm.name" class="box-card chooseAble" tabindex="0"
              @keyup.enter.native="changePad(mm)">
              {{ mm.name }}
              </el-card>
            </div>
            <div v-for="(item, index) in navArr" :key="JSON.stringify(item)" class="flex_con nan_con">
              <el-card v-for="(mm, index) in item" :key="mm.name" class="box-card chooseAble" tabindex="0"
                @focus.native="changeTab(mm.rid)">
                {{ mm.name }}
              </el-card>
            </div>
          </el-header>
          <el-main>
            <nav-con :list="navArr[0]" ref="navCon"></nav-con>
          </el-main>
        </el-container>
      </div>
    `,
    data() {
      return {
        padArr: [
          [{
            name: '历史记录'
          }, {
            name: '关注动态'
          }, {
            name: '我的收藏'
          }, {
            name: '个人信息'
          }],
        ],
        navArr: [
          [{
            name: '舞蹈',
            rid: '129'
          }, {
            name: '游戏',
            rid: '4'
          }, {
            name: '知识',
            rid: '36'
          }, {
            name: '数码',
            rid: '188'
          }, {
            name: '生活',
            rid: '160'
          }, {
            name: '鬼畜',
            rid: '119'
          }, {
            name: '时尚',
            rid: '5'
          }]
        ]
      }
    },
    computed: {
      arr() {
        return this.padArr.concat(this.navArr);
      }
    },
    created() {
      axios.get('./data/random.json').then(({data: {data}}) => {
        console.log(data)
      });
    },
    mounted() {
      this.inputs = document.getElementsByClassName("chooseAble");
      this.inputs[0].focus();
    },
    methods: {
      keyDown(event) {
        this.inputs = document.getElementsByClassName("chooseAble");
        let focus = document.activeElement;

        event = window.event || event;
        let key = event.keyCode;
        for (var i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i] === focus) break;
        }

        let c = i;
        let index = 0;
        while (c >= this.arr[index].length) {
          c = c - this.arr[index++].length;
        }

        let len = this.arr[index].length;
        switch (key) {
          case 37:
            if (i > 0) this.inputs[i - 1].focus();
            break;
          case 38:
            if (i - len >= 0) this.inputs[i - len].focus();
            else this.inputs[0].focus();
            break;
          case 39:
            if (i < this.inputs.length - 1) this.inputs[i + 1].focus();
            break;
          case 40:
            if (i + len < this.inputs.length) this.inputs[i + len].focus();
            break;
        }
      },
      changeTab(str) {
        this.$refs.navCon.changeTab(str);
      },
      changePad(item) {
        console.log(item)
      }
    }
  })
}