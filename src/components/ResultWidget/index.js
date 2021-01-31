import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';

function ResultWidget({ results }) {
  const totalCorrects = useMemo(() => {
    return results.reduce((sum, result) => {
      if (result) {
        return sum + 1;
      }

      return sum;
    }, 0);
  }, [results]);

  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {totalCorrects} perguntas</p>
        <ul>
          {results.map((result, index) => (
            <li key={result}>
              #{index + 1}: {result ? 'Correta' : 'Incorreta'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default ResultWidget;
