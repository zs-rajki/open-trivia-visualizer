import React from 'react';
import { useTriviaData } from '../TriviaDataContext';
import styles from './CategoryPanel.module.css';

function CategoryPanel() {
    const { categories, selectedCategories, toggleCategory } = useTriviaData();

    return (
        <div className={styles.categoryPanel}>
            <h2 className={styles.categoryPanelTitle}>Categories</h2>
            <ul className={styles.categoryList}>
                {categories.map((category, index) => {
                    const isSelected = selectedCategories.includes(category);
                    return (
                        <li 
                            key={index} 
                            className={`${styles.categoryItem} ${isSelected ? styles.categoryItemSelected : ''}`}
                            onClick={() => toggleCategory(category)}
                        >
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CategoryPanel;

