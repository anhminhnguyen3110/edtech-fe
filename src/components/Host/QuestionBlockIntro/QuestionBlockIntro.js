import React, { useEffect } from 'react';
import styles from './QuestionBlockIntro.module.css';
import Grid from '@material-ui/core/Grid';

const QuestionBlockIntro = ({ questionNumber, question, totalNumberOfQuestions, nextStep }) => {
  useEffect(() => {
    const id = setTimeout(() => nextStep(), 5000);

    return () => {
      clearTimeout(id);
    };
  }, [nextStep]);

  return (
    <Grid
      item
      container
      xs={12}
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      className={styles.main}
    >
      <div className={styles.status}>
        {questionNumber} of {totalNumberOfQuestions}
      </div>
      <Grid
        item
        container
        xs={10}
        alignItems="center"
        justify="center"
        className={styles.question}
      >
        {question}
      </Grid>
    </Grid>
  );
};

export default QuestionBlockIntro;
