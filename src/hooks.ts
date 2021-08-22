import { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

export const useIsLoggedIn = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getIsLoggedIn = async (): Promise<void> => {
      const accessToken = await browser.storage.local.get('accessToken');
      setIsLoggedIn(accessToken !== undefined);
    };
    getIsLoggedIn();
  }, []);

  return isLoggedIn;
};
