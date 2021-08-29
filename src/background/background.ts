import { tabs, webRequest, Tabs } from 'webextension-polyfill';
import { MessageType } from '../constants';

interface TabWithId extends Tabs.Tab {
  id: number;
}

const tabHasId = (tab: Tabs.Tab): tab is TabWithId => tab.id !== undefined;

// TODO: is this even required?
tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.includes('clockify.me/tracker')) {
    // TODO: throttle sending the message
    tabs.sendMessage(tabId, { type: MessageType.REFETCH_BALANCE });
  }
});

webRequest.onCompleted.addListener(
  async (details) => {
    if (details.url.includes('timeEntries')) {
      const foundTabs = await tabs.query({ active: true, currentWindow: true });
      foundTabs
        .filter(tabHasId)
        .forEach((tab) =>
          tabs.sendMessage(tab.id, { type: MessageType.REFETCH_BALANCE })
        );
    }
  },
  { urls: ['https://global.api.clockify.me/*'] }
);
