import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegistrationPage from './pages/registration-page';
import NotFoundPage from './pages/not-found-page';
import PrivateRoutes from './routes/private-routes';
import Dashboard from './pages/admin-pages/dashboard';
import LeaderBoardPage from './pages/leaderboard-page';
import QuizPage from './pages/quiz-page';
import ResultPage from './pages/result-page';
import UnauthorizedPage from './pages/unauthrized-page';
import AdminRoutes from './routes/admin-routes';

function App() {

  return (
    <>
      <Routes>
        {/**admin Route */}
        <Route element={<AdminRoutes />}>
          <Route element={<Dashboard />} path='/admin/dashboard' />
        </Route>

        {/** user Route */}
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path='/admin/dashboard' />
          <Route element={<LeaderBoardPage />} path='/leaderboard_page' />
          <Route element={<QuizPage />} path='/quiz_page' />
          <Route element={<ResultPage />} path='/result_page' />
        </Route>

        {/** guess Route */}
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<UnauthorizedPage />} path="/unauthorized" />
        <Route element={<NotFoundPage />} path="*" />

      </Routes>
    </>
  )
}

export default App