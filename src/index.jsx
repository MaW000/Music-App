import React from 'react';
import ReactDOM from 'react-dom/client';
import DataProvider from './utils/DataProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <App />
      </Router>
    </DataProvider>
  </React.StrictMode>
);

