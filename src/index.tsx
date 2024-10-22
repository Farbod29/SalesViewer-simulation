import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This should point to App.tsx
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); // Cast as HTMLElement for TypeScript
root.render(<App />);
