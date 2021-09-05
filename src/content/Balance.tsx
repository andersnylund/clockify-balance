import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { runtime } from 'webextension-polyfill';
import { MessageType } from '../constants';
import { getBalance } from '../expected-working-time';

const BalanceText = styled.div<{ isPositive: boolean }>`
  &&& {
    color: ${({ isPositive }) => (isPositive ? 'green' : 'red')};
  }
`;

export const Balance: FC = () => {
  const { data, refetch } = useQuery('balance', getBalance);

  const onMessageHandler = async ({ type }: { type: MessageType }) => {
    if (type === MessageType.REFETCH_BALANCE) {
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
        <div className="cl-d-flex cl-align-items-center">
          <div className="cl-d-flex cl-align-items-center cl-pr-3">
            <div className="cl-h6 cl-mb-0 cl-lh-1">Balance this month:</div>
            <BalanceText
              className="cl-h2 cl-mb-0 cl-ml-2 cl-lh-1"
              isPositive={data.monthIsPositive}
            >
              {`${data.monthIsPositive ? '+' : '-'} ${data.monthString}`}
            </BalanceText>
          </div>
          <div className="cl-d-flex cl-align-items-center">
            <div className="cl-h6 cl-mb-0 cl-lh-1">Balance this week:</div>
            <BalanceText
              className="cl-h2 cl-mb-0 cl-ml-2 cl-lh-1"
              isPositive={data.weekIsPositive}
            >
              {`${data.weekIsPositive ? '+' : '-'} ${data.weekString}`}
            </BalanceText>
          </div>
        </div>
      )}
    </div>
  );
};
