import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useTriviaData } from "../TriviaDataContext";
import styles from './DifficultyDistributionChart.module.css';

export default function DifficultyDistributionChart() {
    const { questions, selectedCategories, loading, error } = useTriviaData();

    if (loading) {
        return (
            <div className={styles.chartContainer}>
                <h3 className={styles.chartTitle}>Question Distribution by Difficulty</h3>
                <p>Loading chart data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.chartContainer}>
                <h3 className={styles.chartTitle}>Question Distribution by Difficulty</h3>
                <p style={{ color: "red" }}>Error: {error}</p>
            </div>
        );
    }

    // Filter by selected categories (if any)
    const filtered = questions.filter(
        q => selectedCategories.length === 0 || selectedCategories.includes(q.category)
    );

    // Count questions by difficulty
    const difficultyCounts = filtered.reduce(
        (acc, q) => {
            acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
            return acc;
        },
        {}
    );

    const data = Object.entries(difficultyCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Question Distribution by Difficulty</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        nameKey="name"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}