<template>
  <div id="codeEdit_div">
    <el-drawer
      :visible.sync="table"
      direction="ltr"
      size="50%">
        <span slot="title" class="drawer-footer">
          {{ title }}
          <el-button type="success" icon="el-icon-edit" circle size="mini" @click="editFileBtn" :loading="loading"></el-button>
        </span>
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
  loading = false;
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
      vm.changfile = filePath;
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

  editFileBtn() {
    const vm = this;
    this.$confirm('是否写入文件?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    }).then(() => {
      vm.editFile();
    }).catch(() => {
    });
  }

  editFile() {
    const vm = this;
    vm.loading = true;
    axios.post('/api/editFile', {
      data: {
        filePath: vm.changfile,
        content: vm.data
      }
    }).then(({ data: { message, status } }) => {
      vm.$message({
        message: message,
        type: status ? 'success' : 'error'
      });
      vm.loading = false;
    }).catch(() => {
      vm.loading = false;
    });
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

.el-drawer { 
background: #0a0e14!important;
}

.el-drawer__body::-webkit-scrollbar{
  width: 7px;
  height: 7px;
  border-radius: 4px;
  background-color: #0a0e14;
}

/*滚动条中可以拖动的那部分*/
.el-drawer__body::-webkit-scrollbar-thumb{
  background-color: #53b47f62;
  border-radius: 4px;
}
</style>
