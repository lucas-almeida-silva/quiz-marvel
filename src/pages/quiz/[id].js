/* eslint-disable react/prop-types */
import React from 'react';

import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../Screens/Quiz';

function QuizDaGaleraPage({ dbExterno }) {
  return (
    <div>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen
          externalQuestions={dbExterno.questions}
          externalBg={dbExterno.bg}
        />
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');

  const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
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

  return {
    props: {
      dbExterno,
    },
  };
}

export default QuizDaGaleraPage;
