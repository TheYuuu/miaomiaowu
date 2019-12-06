class MyPlugin{
    // 在构造函数中获取用户给该插件传入的配置
    constructor(options){
    }
  
    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler){
      // 在处理来自webpack选项的entry配置后调用。
      compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
        console.log('entryOption');
      });

      // 在设置初始内部插件集之后调用
      compiler.hooks.afterPlugins.tap('MyPlugin', (compiler) => {
        console.log('afterPlugins');
      });

      // 解析器设置完成后触发。
      compiler.hooks.environment.tap('MyPlugin', () => {
        console.log('environment');
      });

      // 在初始化配置文件中的插件之后，在准备编译器环境时调用。
      compiler.hooks.afterEnvironment.tap('MyPlugin', (compiler) => {
        console.log('afterEnvironment');
      });

      // compiler.run() 执行之前
      compiler.hooks.beforeRun.tap('MyPlugin', (compiler) => {
        console.log('beforeRun');
      });

      // 开始读取 records 之前
      compiler.hooks.run.tap('MyPlugin', (compiler) => {
        console.log('run');
      });

      // 监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前
      compiler.hooks.watchRun.tap('MyPlugin', (compiler) => {
        console.log('watchRun');
      });

      // NormalModuleFactory 创建之后
      compiler.hooks.normalModuleFactory.tap('MyPlugin', (normalModuleFactory) => {
        console.log('normalModuleFactory');
      });

      // ContextModuleFactory 创建之后
      compiler.hooks.contextModuleFactory.tap('MyPlugin', (contextModuleFactory) => {
        console.log('contextModuleFactory');
      });

      // 编译(compilation)参数创建之后
      compiler.hooks.beforeCompile.tap('MyPlugin', (compilationParams) => {
        console.log('beforeCompile');
      });

      // 一个新的编译(compilation)创建之后
      compiler.hooks.compile.tap('MyPlugin', (compilationParams) => {
        console.log('compile');
      });

      // 触发 compilation 事件之前执行
      compiler.hooks.thisCompilation.tap('MyPlugin', (compilation, compilationParams) => {
        console.log('thisCompilation');
      });

      // 编译(compilation)创建之后
      compiler.hooks.compilation.tap('MyPlugin', (compilation, compilationParams) => {
        console.log('compilation');
      });

      // 创建编译前
      compiler.hooks.make.tap('MyPlugin', (compilation) => {
        console.log('make');
      });

      // 编译后
      compiler.hooks.afterCompile.tap('MyPlugin', (compilation) => {
        console.log('afterCompile');
      });

      // emit 之前
      compiler.hooks.shouldEmit.tap('MyPlugin', (compilation) => {
        console.log('shouldEmit');
      });

      // 生成资源到 output 目录之前
      compiler.hooks.emit.tap('MyLoader', (compilation) => {
        console.log('-=-==-=-=-=-=-=emit-=-=-=-=-=-=');
        
        console.log(compilation.assets);
      });

      // 生成资源到 output 目录之后。
      compiler.hooks.afterEmit.tap('MyPlugin', (compilation) => {
        console.log('afterEmit');
      });
      
      // 获得字节大小
      compiler.hooks.assetEmitted.tap('MyPlugin', (file, content) => {
        console.log('assetEmitted');
      });

      // 编译(compilation)完成
      compiler.hooks.done.tap('MyPlugin', (stats) => {
        console.log('done');
      });

      // 编译(compilation)失败
      compiler.hooks.failed.tap('MyPlugin', (error) => {
        console.log('failed');
      });

      // 监听模式下，编译无效时。
      compiler.hooks.invalid.tap('MyPlugin', (fileName, changeTime) => {
        console.log('invalid');
      });

      // 监听模式停止
      compiler.hooks.watchClose.tap('MyPlugin', () => {
        console.log('watchClose');
      });
    }
  }
  
  // 导出 Plugin
  module.exports = MyPlugin;