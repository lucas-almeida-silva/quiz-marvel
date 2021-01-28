import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../../db.json';
import QuizContainer from '../components/QuizContainer';
import Widget from '../components/Widget';
import QuizBackground from '../components/QuizBackground';
import Footer from '../components/Footer';
import GitHubCorner from '../components/GitHubCorner';
import QuizLogo from '../components/QuizLogo';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    router.push(`/quiz?name=${name}`);
  }, [name]);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz MDU - Marvel</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Diz aí seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" disabled={!name.length}>Jogar</Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizes da galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Conheça os quizes da galera</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/lucas-almeida-silva/quiz-marvel" />
    </QuizBackground>
  );
}
