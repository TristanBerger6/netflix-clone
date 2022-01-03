import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './signOut.scss';

import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import FooterData from '../../components/Footer/Footer.json';

function SignOut(props) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 15000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <HeroBanner bg="bg-signout">
      <div className="signOut text-white">
        <Header>
          <div className="signOut__head flex">
            <Logo state="clickable" route="home" />
          </div>
        </Header>
        <main className="signOut__card">
          <div className="signOut__card__content bg-white text-grey">
            <h1 className="fw-400">Vous partez déjà ?</h1>
            <p>
              Le saviez-vous ? Inutile de vous déconnecter de Netflix
              systématiquement. Vous devez le faire uniquement si vous êtes sur
              un ordinateur partagé ou public.
              <br />
              <br />
              Vous serez redirigé vers Netflix.com dans 15 secondes
            </p>
            <Link to={ROUTES.HOME} className="btnToHome text-white">
              Essayer maintenant
            </Link>
          </div>
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

export default SignOut;
