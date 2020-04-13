<template>
  <div id="codeEdit_div">
    <el-drawer
      :title="title"
      :visible.sync="table"
      direction="rtl"
      size="50%">
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
import axios from 'axios';

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
  table = false;
  title = '';
  data = '';
  cssOptions= {
    tabSize: 2,
    mode: 'javascript',
    theme: 'ayu-dark',
    lineNumbers: true,
    line: true,
    lineWrapping: true,
    foldGutter: true,
    gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true
  }

  created() {
    const vm = this;

    vm.$bus.$on("openFile", (filePath) => {
      vm.table = true;
      vm.title = filePath;
      axios.get('/api/getFileContent', {
        params: {
          filePath: filePath
        }
      }).then(({ data }) => {
        vm.title = data.title;
        vm.data = data.code;
      });
    });
  }

  mounted() {

  }

  open() {
    this.table = true;
  }
}
</script>

<style>
.CodeMirror {
  height: 100%!important;
}

.el-drawer__body {
  overflow-y: auto;
}
</style>
