import React, { FC, useEffect } from 'react';
import { getUser, getTimeEntries } from '../api';

export const Balance: FC = () => {
  useEffect(() => {
    const getSomething = async () => {
      const user = await getUser();
      const timeEntries = await getTimeEntries(user.defaultWorkspace, user.id);
    };
    getSomething();
  }, []);

  return <div></div>;
};
