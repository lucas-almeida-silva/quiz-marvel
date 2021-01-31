import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';

import db from '../../db.json';
import QuizContainer from '../components/QuizContainer';
import LoadingWidget from '../components/LoadingWidget';
import QuizBackground from '../components/QuizBackground';
import QuizLogo from '../components/QuizLogo';
import QuestionWidget from '../components/QuestionWidget';
import ResultWidget from '../components/ResultWidget';

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  const question = useMemo(() => {
    return db.questions[currentQuestion];
  }, [currentQuestion]);

  const totalQuestions = useMemo(() => {
    return db.questions.length;
  }, [db.questions]);

  const handleAddResult = useCallback((result) => {
    setResults((state) => [
      ...state,
      result,
    ]);
  }, []);

  const handleSubmit = useCallback(() => {
    const hasNextQuestion = (currentQuestion + 1) < totalQuestions;

    if (hasNextQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }, [currentQuestion, totalQuestions]);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={handleAddResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
