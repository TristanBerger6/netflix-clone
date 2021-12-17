import React from 'react';
import './home.scss';

import HeroBanner from '../components/HeroBanner/HeroBanner';
import Header from '../components/Header/Header';
import Logo from './../components/Logo/Logo';
import SignInBtn from '../components/Buttons/SignInBtn';
import SubForm from './../components/Form/SubForm';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/Footer.json';

function Home(props) {
  return (
    <div className="home text-white bg-black">
      <HeroBanner bg="bg-home">
        <Header>
          <div className="home__head flex">
            <Logo state="not-clickable" route="home" />
            <SignInBtn />
          </div>
        </Header>
        <div className="home__card">
          <h1 className="fs-800">Films, séries TV et bien plus en illimité</h1>
          <h2 className="fs-600 fw-400">
            Où que vous soyez. Annulez à tout moment.
          </h2>
          <SubForm />
        </div>
      </HeroBanner>

      <main>
        <Jumbotron />
        <FAQ />
      </main>
      <Footer bg="transparent">
        <Footer.Title>Des quesions ? Appelez le (+33)0805-543-063</Footer.Title>
        <Footer.Grid gridItems={FooterData.home} />
        <p>Netflix france</p>
      </Footer>
    </div>
  );
}

export default Home;
