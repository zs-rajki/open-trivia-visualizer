import { createContext, useContext, useEffect, useRef, useState } from "react";

const TriviaDataContext = createContext();

export function TriviaDataProvider({ children }) {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    async function loadData() {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            setLoading(true);
            setError(null);

            // Fetch 50 questions from the Open Trivia DB API
            const res = await fetch("https://opentdb.com/api.php?amount=50");
            if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`);
            const data = await res.json();

            const fetchedQuestions = data.results || [];

            // Decode all question fields
            const decodedQuestions = fetchedQuestions.map(q => ({
                ...q,
                category: decodeHtml(q.category),
                question: decodeHtml(q.question),
                correct_answer: decodeHtml(q.correct_answer),
                incorrect_answers: q.incorrect_answers.map(decodeHtml),
            }));

            // Extract unique category names from the questions
            const categorySet = new Set(decodedQuestions.map(q => q.category));
            const uniqueCategories = Array.from(categorySet);

            // Update state
            setQuestions(decodedQuestions);
            setCategories(uniqueCategories);
            setSelectedCategories(uniqueCategories);
        } catch (err) {
            console.error("Error loading trivia data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await loadData();
        }
        fetchData();
    }, []);

    function toggleCategory(category) {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    }

    const value = { 
        questions, 
        categories, 
        selectedCategories, 
        toggleCategory,
        loading,
        error
    };
    return (
        <TriviaDataContext.Provider value={value}>
            {children}
        </TriviaDataContext.Provider>
    );
}

export function useTriviaData() {
    return useContext(TriviaDataContext);
}