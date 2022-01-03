import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import PrivateOutlet from './utils/PrivateOutlet';
import Home from './pages/home/home';
import SignIn from './pages/connection/signIn';
import SignUp from './pages/connection/signUp';
import SignOut from './pages/connection/signOut';
import Browse from './pages/browse/browse';
import ResetPassword from './pages/connection/resetPassword';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route
            path={process.env.PUBLIC_URL + ROUTES.SIGN_UP}
            element={<SignUp />}
          />
          <Route
            path={process.env.PUBLIC_URL + ROUTES.SIGN_OUT}
            element={<SignOut />}
          />
          <Route
            path={process.env.PUBLIC_URL + ROUTES.RESET_PASSWORD}
            element={<ResetPassword />}
          />
          <Route
            path={process.env.PUBLIC_URL + ROUTES.BROWSE}
            element={<PrivateOutlet />}
          >
            <Route path="" element={<Browse />}>
              <Route path=":genre" element={<Browse />}></Route>
            </Route>
          </Route>
          <Route
            path="*"
            element={<h1 className="pageNotFound">Sorry, page not found</h1>}
          ></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
