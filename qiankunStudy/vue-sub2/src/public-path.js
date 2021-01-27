(function() {
  if (window.__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-undef
      __webpack_public_path__ = `//localhost:7778/`;
      return;
    }
  }
})();