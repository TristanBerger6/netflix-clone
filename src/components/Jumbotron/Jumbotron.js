import React from 'react';
import './Jumbotron.scss';
import jumboData from './Jumbo.json';

function Jumbotron(props) {
  return (
    <div className="jumbotron">
      {jumboData.map((item) => (
        <Jumbotron.Item key={item.id} item={item}></Jumbotron.Item>
      ))}
    </div>
  );
}

Jumbotron.Item = function JumbotronItem({ item }) {
  return (
    <div className="jumbotron__item-container  grey-bot ">
      <div className={'jumbotron__item flex ' + item.direction}>
        <div className="jumbotron__item__text">
          <h2 className="fs-700">{item.title}</h2>
          <p className="fs-600">{item.subTitle}</p>
        </div>
        <img src={item.image} alt={item.alt} />
      </div>
    </div>
  );
};

export default Jumbotron;
