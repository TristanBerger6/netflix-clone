import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import PrivateOutlet from './utils/PrivateOutlet';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import SignOut from './pages/signOut';
import Browse from './pages/browse';
import ResetPassword from './pages/resetPassword';
import MovieFocus from './components/MovieFocus/MovieFocus';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.SIGN_OUT} element={<SignOut />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.BROWSE} element={<PrivateOutlet />}>
            <Route path="" element={<Browse />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
