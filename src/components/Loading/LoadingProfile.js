import React from 'react';
import './LoadingProfile.scss';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';

function LoadingProfile(props) {
  return (
    <div className="loadingProfile bg-grey-dark text-white">
      <Header>
        <Logo />
      </Header>
      <main className="loadingProfile__card ">
        <div className="loadingProfile__card__spinner ">
          <img src="/images/spinner.png" alt="spinner" />
        </div>
        <div className="loadingProfile__card__user ">
          <img src="/images/user.png" alt="user profile" />
        </div>
      </main>
    </div>
  );
}

export default LoadingProfile;
