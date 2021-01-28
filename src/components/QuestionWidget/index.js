import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import Button from '../Button';

function QuestionWidget({
  question, totalQuestions, currentQuestion, onSubmit,
}) {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    onSubmit();
  }, [onSubmit]);

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${currentQuestion + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        alt="Descrição"
        src={question.image}
      />

      <Widget.Content>
        <h2>{question.title}</h2>

        <p>{question.description}</p>

        <form onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={`question__${currentQuestion}`}
                  type="radio"
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">Confirmar</Button>
        </form>

      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionWidget;
