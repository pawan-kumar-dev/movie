import React from "react";
import "./Card.css";

const Card = ({ Poster, Title, Year, Type }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${Poster})` }}>
      <div className="info">
        <h2>{Title}</h2>
        <p>{Year && `Year: ${Year}`}</p>
        <p>{Type && `Type: ${Type}`}</p>
        <button>Read More</button>
      </div>
    </div>
  );
};

export default Card;
