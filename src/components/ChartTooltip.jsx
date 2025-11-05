import React from 'react';
import styles from './ChartTooltip.module.css';

/**
 * Reusable custom tooltip for Recharts.
 */
export default function ChartTooltip({ active, payload, label, valueLabel = 'Count', className = '', formatLabel, formatValue }) {
    if (!active || !payload || payload.length === 0) return null;

    const item = payload[0];
    const rawLabel = (item && (item.payload && item.payload.name)) || item.name || label || '';
    const displayLabel = formatLabel ? formatLabel(rawLabel) : rawLabel;
    const rawValue = item && item.value;
    const displayValue = formatValue ? formatValue(rawValue) : rawValue;

    return (
        <div className={`${styles.tooltip} ${className}`}>
            <p className={styles.label}>{displayLabel}</p>
            <p className={styles.value}>
                {valueLabel}: <span className={styles.number}>{displayValue}</span>
            </p>
        </div>
    );
}


