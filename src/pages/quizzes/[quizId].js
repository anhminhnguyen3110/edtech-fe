import { useRouter } from 'next/router';
import ShowQuiz from '../../components/Quiz/ShowQuiz/ShowQuiz';
import Header from '../../components/Global/Header';

const ShowQuizPage = () => {
  const router = useRouter();
  const { quizId } = router.query;

  return (
    <div className="app">
      <Header />
      <ShowQuiz quizId={quizId} />
    </div>
  );
};

export default ShowQuizPage;
