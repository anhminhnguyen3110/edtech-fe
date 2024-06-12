import React, { useState, useEffect } from 'react';
import { socket } from '../../Global/Header';
import QuestionBlockIntro from '../QuestionBlockIntro/QuestionBlockIntro';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import ResultBlock from '../ResultBlock/ResultBlock';
import Scoreboard from '../Scoreboard/Scoreboard';
import Gameover from '../Gameover/Gameover';
import queryString from 'query-string';

const Gameblock = (props) => {
  const [step, setStep] = useState(1);
  const [gameId, setGameId] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [quizName, setQuizName] = useState(null);
  const [pin, setPin] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answeredA, setAnsweredA] = useState(0);
  const [answeredB, setAnsweredB] = useState(0);
  const [answeredC, setAnsweredC] = useState(0);
  const [answeredD, setAnsweredD] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [gameStatus, setGameStatus] = useState(true);
  const [rankedPlayers, setRankedPlayers] = useState([]);

  const nextStep = () => {
    setStep(step + 1);
    if (questionNumber === totalNumberOfQuestions) {
      setGameStatus(false);
    }
  };

  const nextQuestion = () => {
    setStep(1);
    setRankedPlayers([]);
    setAnsweredA(0);
    setAnsweredB(0);
    setAnsweredC(0);
    setAnsweredD(0);
    setCorrectAnswer(null);
    socket.emit("PROCEED_TO_NEXT_QUESTION", pin);
  };

  const endGame = () => {
    setStep(5);
    socket.emit("FINISH_GAME", pin);
  };

  const fetchScoreboard = () => {
    socket.emit("FETCH_SCOREBOARD", gameId);
    console.log('Host requesting for scoreboard.');
  };

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    const quizId = parsed.quizId;
    const pin = parseInt(parsed.pin);
    setPin(pin);
    setQuizId(quizId);

    socket.emit("FETCH_FIRST_QUESTION", pin);

    socket.on("RECEIVE_FIRST_QUESTION", data => {
      const { gameId, quizName, question, totalNumberOfQuestions } = data;
      setGameId(gameId);
      setQuizName(quizName);
      setQuestion(question.question);
      setAnswers(question.answers);
      setCorrectAnswer(question.correct);
      setTotalNumberOfQuestions(totalNumberOfQuestions);
    });

    socket.on("QUESTION_RESULT", data => {
      const { answeredA, answeredB, answeredC, answeredD, correctAnswer } = data;
      setAnsweredA(answeredA);
      setAnsweredB(answeredB);
      setAnsweredC(answeredC);
      setAnsweredD(answeredD);
      setCorrectAnswer(correctAnswer);
      setStep(3);
    });

    socket.on("RECEIVE_SCOREBOARD", rankedPlayers => {
      setRankedPlayers(rankedPlayers);
    });

    socket.on("NEXT_QUESTION", data => {
      const { questionNumber, question } = data;
      setQuestionNumber(questionNumber);
      setQuestion(question.question);
      setAnswers(question.answers);
      setCorrectAnswer(question.correct);
    });

    socket.on("GAME_OVER", data => {
      setGameStatus(false);
      setRankedPlayers(data);
    });

    // Clean up socket listeners on component unmount
    return () => {
      socket.off("RECEIVE_FIRST_QUESTION");
      socket.off("QUESTION_RESULT");
      socket.off("RECEIVE_SCOREBOARD");
      socket.off("NEXT_QUESTION");
      socket.off("GAME_OVER");
    };
  }, [props.location.search]);

  let component = null;
  switch(step) {
    case 1:
      component = <QuestionBlockIntro
        nextStep={nextStep}
        questionNumber={questionNumber}
        question={question}
        totalNumberOfQuestions={totalNumberOfQuestions}
      />;
      break;
    case 2:
      component = <QuestionBlock
        nextStep={nextStep}
        pin={pin}
        question={question}
        answers={answers}
      />;
      break;
    case 3:
      component = <ResultBlock
        answers={answers}
        answeredA={answeredA}
        answeredB={answeredB}
        answeredC={answeredC}
        answeredD={answeredD}
        correctAnswer={correctAnswer}
        question={question}
        pin={pin}
        nextStep={nextStep}
        fetchScoreboard={fetchScoreboard}
      />;
      break;
    case 4:
      component = <Scoreboard
        pin={pin}
        rankedPlayers={rankedPlayers}
        questionNumber={questionNumber}
        totalNumberOfQuestions={totalNumberOfQuestions}
        nextQuestion={nextQuestion}
        endGame={endGame}
        gameStatus={gameStatus}
      />;
      break;
    case 5:
      component = <Gameover
        quizName={quizName}
        totalNumberOfQuestions={totalNumberOfQuestions}
        finalRankings={rankedPlayers}
      />;
      break;
    default:
      component = null;
  }

  return (
    <div>
      {component}
    </div>
  );
};

export default Gameblock;
