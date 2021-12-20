import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

import * as ROUTES from '../constants/routes';

import LoadingProfile from '../components/Loading/LoadingProfile';
import Profile from '../components/Profile/Profile';
import BrowseContainer from '../containers/browse';

function Browse(props) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState('');
  const [error, setError] = useState('');
  const { currentUser, signout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return function cleanup() {
      // run only when unmounted, prevent memory leaks
      clearTimeout(timeoutId);
    };
  }, [profile]);

  const handleClick = async function (e) {
    e.preventDefault();
    setError('');
    try {
      await signout();
      navigate(ROUTES.SIGN_OUT);
    } catch (error) {
      setError(error);
    }
  };

  if (profile && loading === false) {
    return (
      <BrowseContainer
        error={error}
        onClick={handleClick}
        currentUser={currentUser}
      />
    );
  } else if (profile && loading === true) {
    return <LoadingProfile />;
  } else {
    return <Profile currentUser={currentUser} setProfile={setProfile} />;
  }
}

export default Browse;
