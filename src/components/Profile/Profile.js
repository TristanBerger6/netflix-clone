import React from 'react';
import './Profile.scss';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';

function Profile({ currentUser, setProfile }) {
  return (
    <div className="profile bg-grey-dark text-white">
      <Header>
        <Logo />
      </Header>
      <main className="profile__card flex">
        <h1 className="fs-800"> Qui est-ce ? </h1>
        <div
          className="profile__card__user flex"
          onClick={() => setProfile(currentUser.displayName)}
        >
          <div className="image">
            <img
              src={process.env.PUBLIC_URL + '/images/user.png'}
              alt="user profile"
            />
          </div>
          <span className="fs-600">{currentUser.displayName}</span>
        </div>
      </main>
    </div>
  );
}

export default Profile;
