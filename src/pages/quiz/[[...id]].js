import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';
import QuizContainer from '../../components/QuizContainer';
import LoadingWidget from '../../components/LoadingWidget';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import QuestionWidget from '../../components/QuestionWidget';
import ResultWidget from '../../components/ResultWidget';

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function Quiz({ quizData }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  const question = useMemo(() => {
    return quizData.questions[currentQuestion];
  }, [currentQuestion]);

  const totalQuestions = useMemo(() => {
    return quizData.questions.length;
  }, [quizData.questions]);

  const handleResetGame = useCallback(() => {
    setCurrentQuestion(0);
    setScreenState(screenStates.QUIZ);
    setResults([]);
  }, []);

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
    <ThemeProvider theme={quizData.theme}>
      <QuizBackground backgroundImage={quizData.bg}>
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

          {screenState === screenStates.RESULT && (
          <ResultWidget results={results} resetGame={handleResetGame} />
          ) }
        </QuizContainer>
      </QuizBackground>
    </ThemeProvider>

  );
}

Quiz.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  quizData: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  let quizData;

  if (context.query.id) {
    const [projectName, gitHubUser] = context.query.id[0].split('___');

    quizData = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Falha ao pegar os dados');
      })
      .then((data) => data)
      .catch((err) => {
        console.error(err);
      });
  } else {
    const localQuiz = (await import('../../../db.json')).default;
    quizData = localQuiz;
  }

  return {
    props: {
      quizData,
    },
  };
}
