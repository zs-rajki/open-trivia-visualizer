import React from 'react';
import { useTriviaData } from "./TriviaDataContext";
import CategoryPanel from "./components/CategoryPanel";
import QuestionDistributionChart from "./components/QuestionDistributionChart";
import DifficultyDistributionChart from './components/DifficultyDistributionChart'; 

function App() {

    const { questions, categories, loading, error } = useTriviaData();

    // Handle loading and error states
    if (loading) return <div className="alt-page">Loading trivia data...</div>;
    if (error) return <div className="alt-page error">Error: {error}</div>;

    return (
        <div className="grid">
            <div className="header">
                <h1>Open Trivia Visualizer</h1>
            </div>
            <div className="category-panel">
                <CategoryPanel />
            </div>
            <div className="description-panel">
                <p><span>{questions.length}</span> questions have been loaded from <span>{categories.length}</span> categories.</p>
                <p>
                    You can see the different categories on the left. The charts show the distribution of
                    questions by difficulty and by category.
                </p>
                <p>
                    You can <span>select categories</span> in the list to filter the data in the graphs.
                    When nothing is selected, all categories are included.
                </p>
            </div>
            <div className="difficulty-distribution-chart">
                <DifficultyDistributionChart />
            </div>
            <div className="question-distribution-chart">
                <QuestionDistributionChart />
            </div>
        </div>
    );
}

export default App;