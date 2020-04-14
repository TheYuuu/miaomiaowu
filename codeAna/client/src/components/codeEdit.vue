<template>
  <div id="codeEdit_div">
    <el-drawer
      :visible.sync="table"
      direction="ltr"
      :withHeader="false"
      :stretch="true"
      size="50%">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <el-button class="edit_btn" type="success" icon="el-icon-edit" circle size="mini" @click="editFileBtn(item)" :loading="loading"></el-button>
            <codemirror v-model="item.code" :options="cssOptions"></codemirror>
          </el-tab-pane>
      </el-tabs>
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
  };

  editableTabsValue =  '';
  editableTabs = [];

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
        vm.addTab({
          filePath: filePath,
          title: data.title,
          name: data.title,
          code: data.code
        });
      });
    });
  }

  mounted() {

  }

  editFileBtn(item) {
    const vm = this;
    this.$confirm('是否写入文件?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    }).then(() => {
      vm.editFile(item);
    }).catch(() => {
    });
  }

  editFile(item) {
    const vm = this;
    vm.loading = true;
    axios.post('/api/editFile', {
      data: {
        filePath: item.filePath,
        content: item.code
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

  addTab(target) {
    const vm = this;
    let index = vm.editableTabs.findIndex((e,i) => e.name === target.name);
    if (index !== -1) return; 
    vm.editableTabs.push(target);
    vm.editableTabsValue = target.name;
  }

  removeTab(targetName) {
    let tabs = this.editableTabs;
    let activeName = this.editableTabsValue;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }
    
    this.editableTabsValue = activeName;
    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
  }
}
</script>

<style>
.el-tab-pane {
  position: relative;
}

.edit_btn {
  position: absolute;
  right: 15px;
  z-index: 10;
}

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
