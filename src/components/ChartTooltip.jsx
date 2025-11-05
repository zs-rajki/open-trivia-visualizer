import React from 'react';
import styles from './ChartTooltip.module.css';

/**
 * Reusable tooltip for Recharts.
 * Works for Bar/Pie etc. by inspecting payload.
 *
 * Props forwarded by Recharts:
 * - active: boolean
 * - payload: [{ value, name, payload: { name, ... } }, ...]
 * - label: string (for some charts)
 *
 * Optional props:
 * - valueLabel: label prefix for the numeric value (default: 'Count')
 * - className: extra class names
 * - formatLabel: (label: string) => string
 * - formatValue: (value: number) => string | number
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


