# Open Trivia Visualizer

A small React app that fetches questions from the Open Trivia DB and visualizes the data with charts (by category and difficulty).

Quick overview
- Data provider and caching: [`TriviaDataContext`](src/TriviaDataContext.jsx)
- Category list: [`CategoryPanel`](src/components/CategoryPanel.jsx)
- Charts:
  - [`QuestionDistributionChart`](src/components/QuestionDistributionChart.jsx)
  - [`DifficultyDistributionChart`](src/components/DifficultyDistributionChart.jsx)
  - Reusable tooltip: [`ChartTooltip`](src/components/ChartTooltip.jsx)

Features
- Fetches 50 questions from Open Trivia DB and decodes HTML entities.
- Local caching in localStorage to avoid rapid repeated API calls.
- Interactive charts built with Recharts. Click categories in the left panel to filter the charts.

Getting started

1. Install
```sh
npm install
```

2. Run dev server
```sh
npm run dev
# open http://localhost:5173
```

How it works (short)
- The app is wrapped with [`TriviaDataProvider`](src/TriviaDataContext.jsx) in [src/main.jsx](src/main.jsx).
- [`useTriviaData`](src/TriviaDataContext.jsx) exposes questions, categories, selectedCategories and toggleCategory to UI.
- Charts subscribe to the context and re-render when selection changes.

Notes & troubleshooting
- The provider caches results in localStorage (`triviaCache`, `lastTriviaFetch`) and skips API calls if a recent fetch exists (to avoid 429).
- If you see no data, check the browser console for fetch errors and verify the Open Trivia DB endpoint is reachable.