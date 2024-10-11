import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from '../services/api';

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const data = await getQuizzes();
            setQuizzes(data);
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto">
                {/* Card header */}
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Quizzes</h1>

                {/* Quizzes list inside the card */}
                <ul className="flex flex-col items-center">
                    {quizzes.map(quiz => (
                        <li key={quiz._id} className="mb-4 w-full max-w-md">
                            <Link
                                to={`/quiz/${quiz._id}`}
                                className="block bg-blue-500 text-white text-lg font-semibold text-center py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                {quiz.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Button to open QuizList inside the card */}
                <div className="mt-8 flex justify-center">
                    <Link
                        to="/quiz-list"
                        className="bg-green-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        View All Quizzes
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Home;
