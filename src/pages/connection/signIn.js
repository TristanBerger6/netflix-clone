import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './signIn.scss';

import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import FooterData from '../../components/Footer/Footer.json';
import SignForm from '../../components/Form/SignForm';

import { useAuth } from '../../contexts/AuthContext';

function SignIn(props) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(''); // avoid spam clicking

  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signin(emailAddress, password);
      navigate(ROUTES.BROWSE);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <HeroBanner bg="bg-home">
      <div className="signIn text-white">
        <Header>
          <div className="signIn__head flex">
            <Logo state="clickable" route="home" />
          </div>
        </Header>
        <main>
          <SignForm onSubmit={handleSubmit}>
            <h1 className="fs-800">S'identifier</h1>
            {error && <SignForm.Error>{error}</SignForm.Error>}
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
            <SignForm.Label id="mdp">Entrez votre mot de passe</SignForm.Label>
            <SignForm.Input
              placeholder="Mot de passe"
              type="password"
              id="mdp"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <SignForm.Submit disabled={loading}> S'identifier </SignForm.Submit>
            <p className="text-grey">
              <Link to={ROUTES.RESET_PASSWORD} className="text-white link">
                Mot de passe oublié ?
              </Link>
            </p>
            <p className="text-grey">
              Première visite sur Netflix ?{' '}
              <Link to={ROUTES.SIGN_UP} className="text-white link">
                Inscrivez-vous
              </Link>
            </p>
          </SignForm>
        </main>

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

export default SignIn;
