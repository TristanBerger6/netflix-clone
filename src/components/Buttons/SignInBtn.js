import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './SignInBtn.scss';

function SignInBtn(props) {
  return (
    <Link
      to={process.env.PUBLIC_URL + ROUTES.SIGN_IN}
      className="btn signInBtn"
    >
      S'identifier
    </Link>
  );
}

export default SignInBtn;
