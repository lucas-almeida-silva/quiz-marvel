import React from 'react';
import styled, { keyframes } from 'styled-components';

import Widget from '../Widget';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loaderRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid ${({ theme }) => theme.colors.primary};
  width: 50px;
  height: 50px;
  animation: ${loaderRotate} 2s linear infinite;
  --webkit-animation: ${loaderRotate} 2s linear infinite;
`;

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <LoaderWrapper>
          <Spinner />
        </LoaderWrapper>
      </Widget.Content>
    </Widget>
  );
}

export default LoadingWidget;
