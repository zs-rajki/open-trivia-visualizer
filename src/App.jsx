import React from 'react';
import { useTriviaData } from "./TriviaDataContext";
import CategoryPanel from "./components/CategoryPanel";

function App() {

    const { questions, categories, loading, error } = useTriviaData();

    if (loading) return <p>Loading trivia data...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className="grid">
            <div className="header">
                <h1>Open Trivia Visualizer</h1>
                <p>Loaded {questions.length} questions from {categories.length} categories.</p>
            </div>
            <div className="category-panel">
                <CategoryPanel />
            </div>
            <div className="chart1">

            </div>
            <div className="chart2">

            </div>
        </div>
    );
}

export default App;