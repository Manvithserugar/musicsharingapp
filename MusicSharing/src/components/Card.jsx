import React from 'react';
import './Card.css';

function Card({ variantName, children}) {
  return (
    <div className={`card-${variantName}`}>
      {children}
    </div>
  );
}


export default Card;
