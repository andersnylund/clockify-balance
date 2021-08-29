import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Balance } from './Balance';
import { ErrorBoundary } from './ErrorBoundary';

const queryClient = new QueryClient();

// TODO: show some error if user is not logged in
// TODO: this is not necessary as the user is always logged in at clockify.me/tracker

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Balance />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
