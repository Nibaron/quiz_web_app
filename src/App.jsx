import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegistrationPage from './pages/registration-page';
import NotFoundPage from './pages/not-found-page';
import PrivateRoutes from './routes/private-routes';
import Dashboard from './pages/admin-pages/dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path='/admin/dashboard' />
        </Route>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  )
}

export default App