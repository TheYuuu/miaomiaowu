<template>
  <div id="codeEdit_div">
    <el-button @click="open">默认按钮</el-button>
    <el-drawer
      :title="title"
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <!-- <textarea class="form-control" id="editor" name="code" :v-model="data"></textarea> -->
      <codemirror v-model="data" :options="cssOptions"></codemirror>
    </el-drawer>
  </div>
</template>

<script>
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator';

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'

// 引入主题样式文件
import 'codemirror/theme/ayu-dark.css'


@Component({
  name: 'codeEdit'
})
export default class extends Vue {
  table = true;
  title = '12312';
  data = `var o = 0;
console.log(1231231)`;
  cssOptions= {
    tabSize: 4,
    mode: 'javascript',
    theme: 'ayu-dark',
    lineNumbers: true,
    line: true,
  }
  mounted() {

  }

  open() {
    this.table = true;
  }
}
</script>

<style>
#codeEdit_div {
  width: 100%;
  height: 100%;
  user-select: none;
  border: 1px solid;
}
</style>
