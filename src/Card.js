import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <div className="info">
        <h1>{title}</h1>
        <p>{description}</p>
        <button> Read More</button>
      </div>
    </div>
  );
};

export default Card;
