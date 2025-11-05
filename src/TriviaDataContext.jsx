import { createContext, useContext, useEffect, useRef, useState } from "react";

const TriviaDataContext = createContext();
/**
 * Provides trivia data and category selection state to child components.
 */
export function TriviaDataProvider({ children }) {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // This is used to prevent multiple fetches in strict mode
    const hasFetched = useRef(false);

    /**
     * Decode HTML entities in a string
     */
    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    /** 
     * Fetch trivia data from the API
     */
    async function loadData() {
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

            // Cache data and timestamp
            localStorage.setItem("triviaCache", JSON.stringify(decodedQuestions));
            localStorage.setItem("lastTriviaFetch", Date.now().toString());
        } catch (err) {
            console.error("Error loading trivia data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        async function fetchData() {
            const lastFetch = localStorage.getItem("lastTriviaFetch");
            const now = Date.now();
            const timeSinceLastFetch = lastFetch ? now - Number(lastFetch) : Infinity;

            // If last fetch < 5 seconds ago, skip API call
            if (timeSinceLastFetch < 5000) {
                console.log("Skipping fetch to avoid API rate limit (429)");

                // Load cached questions if available
                const cached = localStorage.getItem("triviaCache");
                if (cached) {
                    const cachedQuestions = JSON.parse(cached);
                    setQuestions(cachedQuestions);

                    const categorySet = new Set(cachedQuestions.map(q => q.category));
                    setCategories(Array.from(categorySet));
                }

                setLoading(false);
                return;
            }

            await loadData();
        }
        fetchData();
    }, []);

    /**
     * Toggle selection of a category
     */
    function toggleCategory(category) {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
        );
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