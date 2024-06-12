import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './Start.module.css';
import { socket } from '../../Global/Header';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';

const Start = (props) => {
  const [pin, setPin] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [quizName, setQuizName] = useState(null);
  const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    const quizId = parsed.quizId;
    const pin = parseInt(parsed.pin);
    setPin(pin);
    setQuizId(quizId);

    socket.emit("FETCH_INTRO", pin);

    socket.on("GAME_INTRO", data => {
      const { quizName, totalNumberOfQuestions } = data;
      setQuizName(quizName);
      setTotalNumberOfQuestions(totalNumberOfQuestions);

      timeoutId.current = setTimeout(() => setRedirect(true), 5000);
    });

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [props.location.search]);

  if (quizName === null) {
    return null;
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        xs={12}
        style={{ minHeight: "15vh" }}
        className={styles.title}
      >
        <h1>{quizName}</h1>
      </Grid>
      <Grid
        item
        container
        direction="column"
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "75vh" }}
        className={styles.main}
      >
        <div className={styles.questions}>{totalNumberOfQuestions} Questions</div>
        <div>Are you ready?</div>
      </Grid>
      <Footer pin={pin} />
      {redirect && <Redirect to={`/gameblock?quizId=${quizId}&pin=${pin}`} />}
    </Grid>
  );
};

export default Start;
