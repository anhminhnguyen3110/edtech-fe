import axios from 'axios';

const QuizInfo = {
  getQuiz(id) {
    return axios.get(`http://localhost:8080/quizzes/${ id }`)
  },

  getAllQuizzes() {
    return axios.get('http://localhost:8080/quizzes')
  }
}

export default QuizInfo;
