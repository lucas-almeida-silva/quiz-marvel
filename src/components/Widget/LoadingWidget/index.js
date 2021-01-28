import React from 'react';

import Widget from '..';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        Aguarde
      </Widget.Content>
    </Widget>
  );
}

export default LoadingWidget;