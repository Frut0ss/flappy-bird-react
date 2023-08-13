// Bird.js
import React from 'react';
import birdImage from '../static/Avatar.png';

function Bird({ birdY, birdX }) {
  const birdStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    top: birdY,
    left: birdX,
  };

  return (
    <img src={birdImage} alt="Bird" style={birdStyle} />
  );
}

export default Bird;