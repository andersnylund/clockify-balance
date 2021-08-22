import React, { FC, useEffect, useState } from 'react';
import { getBalance } from '../expected-working-hours';

export const Balance: FC = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getSomething = async () => {
      const result = await getBalance();
      setBalance(result);
    };
    getSomething();
  }, []);

  return (
    <div style={{ color: balance < 0 ? 'red' : 'green' }}>{`${
      balance > 0 ? '+' : '-'
    } ${balance}`}</div>
  );
};
