import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { runtime } from 'webextension-polyfill';
import { getBalance } from '../expected-working-hours';

const BalanceText = styled.div<{ balance: number }>`
  &&& {
    color: ${({ balance }) => (balance >= 0 ? 'green' : 'red')};
    background-color: inherit;
  }
`;

export const Balance: FC = () => {
  const { data, refetch } = useQuery('balance', getBalance);

  const onMessageHandler = async (message: {
    type: string;
    payload: unknown;
  }) => {
    if (message.type === 'TAB_ACTIVATED') {
      await refetch();
    }
  };

  useEffect(() => {
    runtime.onMessage.addListener(onMessageHandler);
    return () => runtime.onMessage.removeListener(onMessageHandler);
  }, []);

  return (
    <div className="cl-card cl-p-3">
      {!data ? (
        <div className="cl-h2 cl-mb-0 cl-ml-2 cl-lh-1">Loading...</div>
      ) : (
        <div className="cl-d-flex cl-align-items-end">
          <div className="cl-h6 cl-mb-0 cl-lh-1">Balance this month:</div>
          <BalanceText
            className="cl-h2 cl-mb-0 cl-ml-2 cl-lh-1"
            balance={data.month}
          >
            {`${data.month >= 0 ? '+ ' : ''}${data.month}`}
            {/* TODO: format time from decimal number to hours and minutes */}
          </BalanceText>
        </div>
      )}
    </div>
  );
};
