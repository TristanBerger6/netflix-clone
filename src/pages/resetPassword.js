import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import './resetPassword.scss';

import HeroBanner from '../components/HeroBanner/HeroBanner';
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/Footer.json';
import SignForm from '../components/Form/SignForm';

import { useAuth } from '../contexts/AuthContext';

function ResetPassword(props) {
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(''); // avoid spam clicking

  const { resetPassword } = useAuth();

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await resetPassword(emailAddress);
      setMessage('Consultez votre boîte mail pour changer votre mot de passe');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <HeroBanner bg="bg-home">
      <div className="resetPw text-white">
        <Header>
          <div className="resetPw__head flex">
            <Logo state="clickable" route="home" />
          </div>
        </Header>
        <SignForm onSubmit={handleSubmit}>
          <h1 className="fs-800">Réinitialiser mot de passe</h1>
          {error && <SignForm.Error>{error}</SignForm.Error>}
          {message && <SignForm.Message>{message}</SignForm.Message>}
          <SignForm.Label id="email">
            Entrez votre adresse e-mail
          </SignForm.Label>
          <SignForm.Input
            placeholder="E-mail"
            type="email"
            id="email"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />

          <SignForm.Submit disabled={loading}> Envoyer </SignForm.Submit>
          <p className="text-grey">
            <Link to={ROUTES.SIGN_IN} className="text-white link">
              Connectez vous
            </Link>
          </p>
        </SignForm>

        <Footer bg="rgba(0,0,0,0.8)">
          <Footer.Title>
            Des quesions ? Appelez le (+33)0805-543-063
          </Footer.Title>
          <Footer.Grid gridItems={FooterData.sign} />
        </Footer>
      </div>
    </HeroBanner>
  );
}

export default ResetPassword;
