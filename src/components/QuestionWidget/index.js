import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import Button from '../Button';
import AlternativesForm from '../AlternativesForm';
import BackLinkArrow from '../BackLinkArrow';

function QuestionWidget({
  question,
  totalQuestions,
  currentQuestion,
  addResult,
  onSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(null);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);

  const hasSelectedAlternative = useMemo(() => {
    return selectedAlternative !== undefined;
  }, [selectedAlternative]);

  const isCorrect = useMemo(() => {
    return selectedAlternative === question.answer;
  }, [selectedAlternative]);

  const handleSelectAlternative = useCallback((alternativeIndex) => {
    setSelectedAlternative(alternativeIndex);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    setIsQuestionSubmited(true);

    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubmited(false);
      setSelectedAlternative(null);
    }, 3000);
  }, [onSubmit, isCorrect]);

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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

        <AlternativesForm onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const isSelectedAlternative = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                selected={isSelectedAlternative}
                status={isQuestionSubmited && isSelectedAlternative && (
                  isCorrect ? 'SUCCESS' : 'ERROR'
                )}
              >
                <input
                  id={alternativeId}
                  name={`question__${currentQuestion}`}
                  checked={isSelectedAlternative}
                  onChange={() => handleSelectAlternative(alternativeIndex)}
                  type="radio"
                  style={{ display: 'none' }}
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasSelectedAlternative}>Confirmar</Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  addResult: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionWidget;
