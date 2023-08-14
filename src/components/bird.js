// Bird.js
import React from 'react';
import birdImageDefault from '../static/pajaro.png';

function Bird({ birdY, birdX, birdImage }) {
  const birdStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    top: birdY,
    left: birdX,
  };

  return (
    <img src={birdImage || birdImageDefault} alt="Bird" style={birdStyle} />
  );
}

export default Bird;