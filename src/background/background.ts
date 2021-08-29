import { tabs } from 'webextension-polyfill';

// TODO: is this even required?
tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.includes('clockify.me/tracker')) {
    // TODO: throttle sending the message
    tabs.sendMessage(tabId, { type: 'TAB_ACTIVATED', payload: {} });
  }
});
