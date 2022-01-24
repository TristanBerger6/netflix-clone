import React, { useState } from 'react';
import './SubForm.scss';
import SignForm from './SignForm';

function SubForm({ num }) {
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('display');
  };

  return (
    <form className="subForm" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="fs-600 fw-400">
        Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
        abonner ou réactiver votre abonnement
      </h3>
      <div className={`subForm__error ${error}`}>
        <SignForm.Error>
          Ceci est un formulaire purement visuel, cliquez en haut a droite sur
          le bouton s'identifier pour continuer
        </SignForm.Error>
      </div>
      <div className="subForm__block flex">
        <label htmlFor={`email-address${num}`} className="sr-only">
          Input uniquement visuelle
        </label>
        <input
          type="text"
          id={`email-address${num}`}
          placeholder=" Adresse e-mail "
          className="fs-400"
        ></input>
        <button type="submit" className="fs-500 btn ">
          Commencer
        </button>
      </div>
    </form>
  );
}

export default SubForm;
