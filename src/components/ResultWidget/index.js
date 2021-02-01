import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import Button from '../Button';

function ResultWidget({ results, resetGame }) {
  const router = useRouter();

  const handleReturnToHomePage = useCallback(() => {
    router.push('/');
  }, [router]);

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
        Resultado Final
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {totalCorrects} perguntas</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              #{index + 1}: {result ? 'Correta' : 'Incorreta'}
            </li>
          ))}
        </ul>

        <Button
          type="button"
          onClick={resetGame}
        >
          Jogar novamente
        </Button>

        <Button
          type="button"
          onClick={handleReturnToHomePage}
          style={{ marginTop: '10px' }}
        >
          Voltar ao início
        </Button>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default ResultWidget;
