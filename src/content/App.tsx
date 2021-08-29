import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Balance } from './Balance';

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Balance />
    </QueryClientProvider>
  );
};
