import { Link } from 'react-router-dom';

const QuizList = () => {
    // Sample quizzes for showcase
    const sampleQuizzes = [
        { _id: '1', title: 'JavaScript Basics' },
        { _id: '2', title: 'React Fundamentals' },
        { _id: '3', title: 'Node.js Overview' },
        { _id: '4', title: 'CSS Styling Techniques' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Quizzes</h1>
            <ul className="flex flex-col items-center">
                {sampleQuizzes.length > 0 ? (
                    sampleQuizzes.map((quiz) => (
                        <li key={quiz._id} className="mb-4 w-full max-w-md">
                            <Link
                                to={`/quiz/${quiz._id}`}
                                className="block bg-blue-500 text-white text-lg font-semibold text-center py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                {quiz.title}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No quizzes available.</p>
                )}
            </ul>
        </div>
    );
};

export default QuizList;
