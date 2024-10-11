import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuizSubmission from './QuizSubmission'; // Ensure you import QuizSubmission

const QuizDetail = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({}); // State to store user answers
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the quiz is submitted

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://localhost:8084/api/quizzes/${quizId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                setQuiz(data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleAnswerChange = (questionIndex, selectedChoice) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedChoice,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsSubmitted(true); // Update the submission state
    };

    if (!quiz) {
        return <p>Loading...</p>; // Loading state while fetching quiz
    }

    // Calculate score only if the quiz is submitted
    const score = isSubmitted ? calculateScore(quiz, answers) : null;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{quiz.title}</h1>
            <p className="mb-6 text-center text-gray-600">{quiz.description}</p>

            <div className="flex flex-col items-center">
                {!isSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                        {quiz.questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-bold text-lg">{question.question}</p>
                                {question.choices.map((choice, idx) => (
                                    <label key={idx} className="block">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={choice}
                                            onChange={() => handleAnswerChange(index, choice)}
                                            className="mr-2 leading-tight"
                                        />
                                        <span className="text-gray-700">{choice}</span>
                                    </label>
                                ))}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Submit Answers
                        </button>
                    </form>
                ) : (
                    // Display submission results
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <QuizSubmission
                            score={score} // Pass calculated score
                            totalQuestions={quiz.questions.length}
                            userAnswers={Object.values(answers)}
                            quiz={quiz}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// Example function to calculate score
const calculateScore = (quiz, answers) => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
        }
    });
    return score;
};

export default QuizDetail;
