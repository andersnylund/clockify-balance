import browser, { storage } from 'webextension-polyfill';
import { REDIRECT_URL } from '../constants';

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (tab.url?.includes(REDIRECT_URL)) {
      const search = tab.url.split('?')[1];
      const params = new URLSearchParams(search);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');
      await storage.local.set({ accessToken, refreshToken });
      browser.tabs.remove(tabId);
    }
  }
});
