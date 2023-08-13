import React from 'react';

const GAP_HEIGHT = 150;  // Altura que quieres dejar para que el pájaro pase
const PIPE_WIDTH = 50;  // El ancho del pipe, si quieres variarlo

function Pipe({ height, position }) {
  return (
    <>
      <div 
        style={{ 
          position: 'absolute', 
          left: position, 
          width: '50px', 
          height: `${height}px`, 
          backgroundColor: 'green' 
        }}
      ></div>
      <div 
        style={{ 
          position: 'absolute', 
          left: position, 
          width: '50px', 
          top: height + GAP_HEIGHT, 
          bottom: 0, 
          backgroundColor: 'green' 
        }}
      ></div>
    </>
  );
}


export default Pipe;
