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
import ChartTooltip from './ChartTooltip';

export default function QuestionDistributionChart() {
    const { questions, selectedCategories } = useTriviaData();

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
                <BarChart 
                    data={data} 
                    margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                    className={styles.barChart}
                >
                    <CartesianGrid 
                        strokeDasharray="5 5" 
                        stroke="rgba(255, 255, 255, 0.2)"
                        vertical={false}
                    />
                    <XAxis 
                        dataKey="name" 
                        interval={0} 
                        angle={-35} 
                        textAnchor="end" 
                        height={80}
                        tick={{ fill: '#858585', fontFamily: 'Geist, sans-serif', fontSize: "0.5rem" }}
                        tickLine={{ stroke: 'rgba(255, 255, 255, 0.4)' }}
                    />
                    <YAxis 
                        tick={{ fill: '#858585', fontFamily: 'Geist, sans-serif', fontWeight: "600", fontSize: "1rem" }}
                        tickLine={{ stroke: 'rgba(255, 255, 255, 0.4)' }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.4)' }}
                    />
                    <Tooltip content={<ChartTooltip valueLabel="Count" />} />
                    <Bar 
                        dataKey="count" 
                        fill="#FCA311"
                        fillOpacity={0.75} 
                        radius={[8, 8, 0, 0]}
                        className={styles.bar}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}