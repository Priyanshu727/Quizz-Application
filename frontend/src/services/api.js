const BASE_URL = 'http://localhost:8084/api/quizzes'; // Update with your backend port

export const getQuizzes = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch quizzes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getQuizById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch quiz");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const submitQuiz = async (id, answers) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });
        if (!response.ok) throw new Error("Failed to submit quiz");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
