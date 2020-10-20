chrome.tabs.query({
  active: true,
  currentWindow: true
}, (tabs) => {
  let message = {
    info: 'TV ON'
  }
  chrome.tabs.sendMessage(tabs[0].id, message, res => {
      console.log('popup=>content')
      console.log(res)
  })
});

window.close();