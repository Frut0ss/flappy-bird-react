import React from 'react';

function Bird({ birdY }) {
  return (
    <div style={{ position: 'absolute', bottom: birdY, width: '50px', height: '50px', backgroundColor: 'yellow' }}>
    </div>
  );
}

export default Bird;
