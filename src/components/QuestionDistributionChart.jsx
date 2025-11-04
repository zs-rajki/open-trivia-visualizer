import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTriviaData } from "../TriviaDataContext";
import styles from './QuestionDistributionChart.module.css';

export default function QuestionDistributionChart() {
    const { questions, selectedCategories, loading, error } = useTriviaData();

    if (loading) {
        return (
            <div className={styles.chartContainer}>
                <h3 className={styles.chartTitle}>Question Distribution by Category</h3>
                <p>Loading chart data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.chartContainer}>
                <h3 className={styles.chartTitle}>Question Distribution by Category</h3>
                <p style={{ color: "red" }}>Error: {error}</p>
            </div>
        );
    }

    // Count how many questions per category (filtered by selectedCategories)
    const data = questions
        .filter(q => selectedCategories.length === 0 || selectedCategories.includes(q.category))
        .reduce((acc, q) => {
            const found = acc.find(item => item.name === q.category);
            if (found) {
                found.count += 1;
            } else {
                acc.push({ name: q.category, count: 1 });
            }
            return acc;
        }, []);

    // Sort data by count (descending) for better visualization
    data.sort((a, b) => b.count - a.count);

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Question Distribution by Category</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}