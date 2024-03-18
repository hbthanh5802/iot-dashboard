import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '@/components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@/contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
