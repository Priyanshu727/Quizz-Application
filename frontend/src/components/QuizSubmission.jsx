import PropTypes from 'prop-types';

const QuizSubmission = ({ score, totalQuestions, userAnswers, quiz }) => {
    return (
        <div className="mt-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Quiz Submission</h2>
            <p className="mt-4 text-center text-lg">
                You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{totalQuestions}</span>.
            </p>

            <h3 className="mt-6 font-semibold text-lg text-center">Your Answers:</h3>
            <ul className="mt-2">
                {quiz.questions.map((question, index) => (
                    <li key={index} className="mb-4 border-b pb-4">
                        <p className="font-bold">{question.question}</p>
                        <p className="mt-1">
                            Your answer: <span className="text-blue-500 font-semibold">{userAnswers[index]}</span>
                        </p>
                        <p className="mt-1">
                            Correct answer: <span className="text-green-500 font-semibold">{question.correctAnswer}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>

    );
};

// Prop validation
QuizSubmission.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    userAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    quiz: PropTypes.shape({
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                question: PropTypes.string.isRequired,
                correctAnswer: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default QuizSubmission;
