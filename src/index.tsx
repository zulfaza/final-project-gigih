import React from 'react';
import ReactDOM from 'react-dom/client';
import 'core/styles/tailwind.css';
import App from './App';
import AppProviders from 'core/context';
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppProviders>
    <App />
  </AppProviders>
);

// reportWebVitals();
