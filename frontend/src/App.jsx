import { useEffect, useState } from 'react'; // Import useEffect and useState from React
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Home from './pages/Home';
// import QuizPage from './pages/QuizPage';
import QuizList from './components/QuizList';
import QuizDetail from './components/QuizDetail';

const App = () => {
  const [quizzes, setQuizzes] = useState([]); // Initialize quizzes as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/quizzes');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data); // Set quizzes data from the API
      } catch (error) {
        setError(error.message); // Set error message
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of the outcome
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading quizzes...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList quizzes={quizzes} />} />
        {/* <Route path="/quizzes/:id" element={<QuizPage />} /> */}
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
      </Routes>
    </div>
  );
};

export default App;
