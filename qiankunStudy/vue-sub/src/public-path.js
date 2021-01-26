(function() {
  if (window.__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-undef
      __webpack_public_path__ = `//localhost:7777/`;
      return;
    }

    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line no-undef
      // console.log(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + 'vue-sub-dir/')
      __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + 'vue-sub-dir/';
      return;
    }

    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
})();