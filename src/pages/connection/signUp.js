import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './signUp.scss';

import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import FooterData from '../../components/Footer/Footer.json';
import SignForm from '../../components/Form/SignForm';

import { useAuth } from '../../contexts/AuthContext';

function SignUp(props) {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(''); // avoid spam clicking

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const signUpRes = await signup(emailAddress, password);
      await signUpRes.user.updateProfile({ displayName: name });
      navigate(process.env.PUBLIC_URL + ROUTES.SIGN_IN);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <HeroBanner bg="bg-home">
      <div className="signUp text-white">
        <Header>
          <div className="signUp__head flex">
            <Logo state="clickable" route="home" />
          </div>
        </Header>
        <main>
          <SignForm onSubmit={handleSubmit}>
            <h1 className="fs-800">S'inscrire</h1>
            {error && <SignForm.Error>{error}</SignForm.Error>}
            <SignForm.Label id="name">Entrez votre nom</SignForm.Label>
            <SignForm.Input
              placeholder="name"
              type="text"
              id="name"
              onChange={({ target }) => setName(target.value)}
              value={name}
            />
            <SignForm.Label id="email">
              Entrez votre adresse e-mail
            </SignForm.Label>
            <SignForm.Input
              placeholder={'E-mail'}
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

            <SignForm.Submit disabled={loading}> S'inscrire </SignForm.Submit>
            <p className="text-grey">
              Vous avez déjà un compte ?{' '}
              <Link
                to={process.env.PUBLIC_URL + ROUTES.SIGN_IN}
                className="text-white link"
              >
                Connectez vous
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

export default SignUp;
