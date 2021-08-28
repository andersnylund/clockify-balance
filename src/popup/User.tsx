import React, { FC, useEffect, useState } from 'react';
import { getUser, User as UserType } from '../api';

export const User: FC = () => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getAndSetUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    getAndSetUser();
  }, []);

  return <div>{`Logged in as ${user?.name}`}</div>;
};
