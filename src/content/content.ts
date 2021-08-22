import browser from 'webextension-polyfill';

browser.runtime.sendMessage('Hello from content.ts');
