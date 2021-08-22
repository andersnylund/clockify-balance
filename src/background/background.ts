import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
});
