import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import App from './App.jsx';
import AuthProvider from './providers/auth-provider.jsx';
import './index.css'
import QuizIdProvider from './providers/quiz-id-provider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QuizIdProvider>
        <Router>
          <App />
        </Router>
      </QuizIdProvider>
    </AuthProvider>
  </StrictMode>,
)