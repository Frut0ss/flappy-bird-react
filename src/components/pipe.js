import React from 'react';
import pipeImage from '../static/pipe.png';

const GAP_HEIGHT = 150;  // Altura que quieres dejar para que el pájaro pase
const PIPE_WIDTH = 50;  // El ancho del pipe, si quieres variarlo

function Pipe({ height, position }) {
  return (
    <>
      {/* Tubo superior */}
      <div 
        style={{ 
          position: 'absolute', 
          left: position, 
          width: PIPE_WIDTH, 
          height: `${height}px`, 
          backgroundImage: `url(${pipeImage})`,
          backgroundSize: `${PIPE_WIDTH}px auto`, // Asegurándose de que el ancho sea completo
          backgroundRepeat: 'no-repeat',
          transform: 'scaleY(-1)' // Voltea la imagen verticalmente
        }}
      ></div>

      {/* Tubo inferior */}
      <div 
        style={{ 
          position: 'absolute', 
          left: position, 
          width: PIPE_WIDTH, 
          top: height + GAP_HEIGHT, 
          bottom: 0, 
          backgroundImage: `url(${pipeImage})`,
          backgroundSize: `${PIPE_WIDTH}px auto`, // Asegurándose de que el ancho sea completo
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </>
  );
}

export default Pipe;
