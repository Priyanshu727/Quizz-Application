import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById, submitQuiz } from '../services/api';
import QuizDetail from '../components/QuizDetail';
import QuizSubmission from '../components/QuizSubmission';

const QuizPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        const fetchQuiz = async () => {
            const data = await getQuizById(id);
            setQuiz(data);
        };

        fetchQuiz();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await submitQuiz(id, answers);
        if (response) {
            setScore(response.score);
            setTotalQuestions(response.totalQuestions);
            setIsSubmitted(true);
        }
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="mt-6 max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            {isSubmitted ? (
                <div className="text-center">
                    <QuizSubmission
                        score={score}
                        totalQuestions={totalQuestions}
                        userAnswers={answers}
                        quiz={quiz}
                    />
                </div>
            ) : (
                <div className="text-left">
                    <QuizDetail
                        quiz={quiz}
                        handleSubmit={handleSubmit}
                        handleAnswerChange={handleAnswerChange}
                    />
                </div>
            )}
        </div>

    );
};

export default QuizPage;
