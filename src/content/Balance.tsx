import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { runtime } from 'webextension-polyfill';
import { getBalance } from '../balance';
import { MessageType } from '../constants';

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
          {Array.from(data.keys()).map((interval) => {
            const here = data.get(interval);
            return here ? (
              <div
                key={interval}
                className="cl-d-flex cl-align-items-center cl-pr-3"
              >
                <div className="cl-h6 cl-mb-0 cl-lh-1">
                  {`Balance this ${interval}`}:
                </div>
                <BalanceText
                  className="cl-h2 cl-mb-0 cl-ml-2 cl-lh-1"
                  isPositive={here?.isPositive}
                >
                  {`${here.isPositive ? '+' : '-'}${here.stringRepresentation}`}
                </BalanceText>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};
