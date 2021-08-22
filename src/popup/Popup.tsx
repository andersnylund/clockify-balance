import React, { FC } from 'react';
import styled from 'styled-components';
import { useIsLoggedIn } from '../hooks';
import { Balance } from './Balance';

const Popup: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Container>
      {isLoggedIn ? (
        <Balance />
      ) : (
        <Button
          onClick={() => {
            window.open('https://clockify.me/redirect/4');
          }}
        >
          Login
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: #bada55;
  border-radius: 4px;
  border: none;
  box-shadow: 2px 3px 5px 0px #e2e2e2;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;

export default Popup;
