import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import styles from './QuestionBlock.module.css';
import { socket } from '../../Global/Header';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';

const QuestionBlock = ({ pin, question, answers, nextStep }) => {
  const [time, setTime] = useState(20);
  const [playersAnswered, setPlayersAnswered] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const timer = () => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          socket.emit("QUESTION_END", pin);
          nextStep();
          return 0;
        }
        return prevTime - 1;
      });
    };

    const id = setInterval(timer, 1000);
    setIntervalId(id);

    socket.on("UPDATE_PLAYERS_ANSWERED", setPlayersAnswered);

    socket.on("FETCH_TIME", playerId => {
      const data = {
        pin,
        playerId,
        time
      };
      socket.emit("SEND_TIME", data);
    });

    return () => {
      socket.off("UPDATE_PLAYERS_ANSWERED");
      socket.off("FETCH_TIME");
      clearInterval(id);
    };
  }, [pin, nextStep, intervalId, time]);

  const name = playersAnswered === 1 ? <span>answer</span> : <span>answers</span>;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        xs={12}
        style={{ minHeight: "20vh" }}
        className={styles.question}
      >
        <h1>{question}</h1>
      </Grid>
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        xs={12}
        style={{ minHeight: "40vh" }}
        className={styles.controls}
      >
        <div className={styles.time}>{time}</div>
        <div className={styles.right}>
          <div className={styles.answersCounter}>
            <div className={styles.count}>{playersAnswered || 0}</div>
            <div className={styles.answer}>
              {name}
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "30vh" }}
        className={styles.answers}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={6}
          className={styles.red}
        >
          <FavoriteIcon className={styles.icons} />{answers.a}
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={6}
          className={styles.blue}
        >
          <GradeIcon className={styles.icons} />{answers.b}
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={6}
          className={styles.orange}
        >
          <FiberManualRecordRoundedIcon className={styles.icons} />{answers.c}
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={6}
          className={styles.green}
        >
          <Brightness3SharpIcon className={styles.icons} />{answers.d}
        </Grid>
      </Grid>
      <Footer pin={pin} />
    </Grid>
  );
};

export default QuestionBlock;
