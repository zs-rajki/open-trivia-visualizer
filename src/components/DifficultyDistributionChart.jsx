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
import styles from "./DifficultyDistributionChart.module.css";
import ChartTooltip from "./ChartTooltip";

/**
 * Displays a pie chart showing the distribution of questions by difficulty.
 */
export default function DifficultyDistributionChart() {
    const { questions, selectedCategories } = useTriviaData();

    // Filter by selected categories (if any)
    const filtered = questions.filter(
        (q) =>
            selectedCategories.length === 0 ||
            selectedCategories.includes(q.category)
    );

    // Count questions by difficulty
    const difficultyCounts = filtered.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
    }, {});

    // Convert to Recharts data format
    const data = Object.entries(difficultyCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
    }));

    // Donut slice colors
    const COLORS = [
        "rgba(255, 183, 3, 0.5)",
        "rgba(251, 133, 0, 0.5)",
        "rgba(255, 103, 0, 0.5)"
    ];

    // Custom label renderer: places text inside slices with custom font
    const renderLabelInside = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fontSize="1rem"
            >
                {(percent * 100).toFixed(0)}%
            </text>
        );
    };

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>
                Question Distribution by Difficulty
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        // innerRadius={60}
                        // outerRadius={120}
                        innerRadius="45%"
                        outerRadius="90%"
                        dataKey="value"
                        nameKey="name"
                        label={renderLabelInside} // custom label inside slices
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                className={styles.pieCell}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip valueLabel="Count" />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{
                            fontFamily: "Geist, sans-serif",
                            fontWeight: "600",
                            fontSize: "1rem",
                        }}
                        iconType="square"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}