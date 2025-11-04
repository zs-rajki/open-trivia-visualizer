import { createContext, useContext, useEffect, useRef, useState } from "react";

const TriviaDataContext = createContext();

export function TriviaDataProvider({ children }) {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

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

            // Extract unique category names from the questions
            const categorySet = new Set(fetchedQuestions.map(q => q.category));
            const uniqueCategories = Array.from(categorySet);

            // Update state
            setQuestions(fetchedQuestions);
            setCategories(uniqueCategories);
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

    const value = { questions, categories};
    return (
        <TriviaDataContext.Provider value={value}>
            {children}
        </TriviaDataContext.Provider>
    );
}

export function useTriviaData() {
    return useContext(TriviaDataContext);
}