import React, { FC } from 'react';
import styled from 'styled-components';

const Popup: FC = () => {
  return (
    <Container>
      Configuration and other settings will be available soon
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

export default Popup;
