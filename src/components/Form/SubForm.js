import React from 'react';
import './SubForm.scss';

function SubForm(props) {
  return (
    <form className="subForm">
      <h3 className="fs-600 fw-400">
        Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
        abonner ou réactiver votre abonnement
      </h3>
      <div className="subForm__block flex">
        <label htmlFor="email-address" className="sr-only">
          Saisir l'addresse e-mail
        </label>
        <input
          type="text"
          id="email-address"
          placeholder="Adresse e-mail"
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
