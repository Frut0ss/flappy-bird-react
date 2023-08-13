import React, { useState, useEffect } from 'react';
import Bird from '/bird';
import Pipe from '/pipe';

function App() {
  const [birdY, setBirdY] = useState(300);
  const [pipePosition, setPipePosition] = useState(1000); // iniciar fuera de la pantalla
  const [pipeHeight, setPipeHeight] = useState(300);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      // Mover tubo y pájaro
    }, 20);
    
    return () => clearInterval(gameInterval);
  }, [birdY, pipePosition, pipeHeight]);

  return (
    <div onClick={() => setBirdY(prev => prev - 20)}> {/* Subir pájaro al hacer click */}
      <Bird birdY={birdY} />
      <Pipe height={pipeHeight} position={pipePosition} />
    </div>
  );
}

export default App;
