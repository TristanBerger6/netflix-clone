import React, { useState } from 'react';
import './FAQ.scss';
import FAQData from './FAQ.json';
import SubForm from '../Form/SubForm';

function FAQ(props) {
  return (
    <div className="faq-container">
      <div className="faq">
        <h2 className="fs-700">Foire aux questions</h2>
        <ul>
          {FAQData.map((item) => (
            <FAQ.Item key={item.id} item={item} />
          ))}
        </ul>
        <SubForm num="2" />
      </div>
    </div>
  );
}

FAQ.Item = function FAQItem({ item }) {
  const [state, setState] = useState('closed');

  const handleClick = () => {
    state === 'closed' ? setState('opened') : setState('closed');
  };
  return (
    <li id={'faq__item' + item.id} className="faq__item">
      <button
        onClick={handleClick}
        aria-controls={'faq__item' + item.id}
        className=" faq__item__question bg-grey text-white fs-600"
      >
        {item.header}
        {state === 'closed' ? (
          <img
            src={process.env.PUBLIC_URL + '/images/add.png'}
            alt="click to open"
          ></img>
        ) : (
          <img
            src={process.env.PUBLIC_URL + '/images/close-slim.png'}
            alt="click to open"
          ></img>
        )}
      </button>
      <div className={'faq__item__answer-wrapper ' + state}>
        <div className="faq__item__answer bg-grey fs-600 ">
          {item.body1}
          {item.body2 && <br />}
          {item.body2 && <br />}
          {item.body2 ? item.body2 : null}
        </div>
      </div>
    </li>
  );
};
export default FAQ;
