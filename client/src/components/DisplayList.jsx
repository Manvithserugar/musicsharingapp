import React from 'react';
import './DisplayList.css';

function DisplayList({ data }) {
  return (
    <ul className="display-list">
      {data.map((item, index) => (
        <li key={index} className="display-list-item">
              {item.song}
              {item.listners}
              {item.artist}
        </li>
      ))}
    </ul>
  );
}

export default DisplayList;
