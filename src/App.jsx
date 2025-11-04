import React from 'react';
import { useTriviaData } from "./TriviaDataContext";
import CategoryPanel from "./components/CategoryPanel";
import QuestionDistributionChart from "./components/QuestionDistributionChart";
import DifficultyDistributionChart from './components/DifficultyDistributionChart'; 

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
            <div className="question-distribution-chart">
                <QuestionDistributionChart />
            </div>
            <div className="difficulty-distribution-chart">
                <DifficultyDistributionChart />
            </div>
        </div>
    );
}

export default App;