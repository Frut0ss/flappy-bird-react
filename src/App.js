import React, { useState, useEffect } from 'react';
import Bird from './components/bird';
import Pipe from './components/pipe';

function App() {
  const GAP_HEIGHT = 150;  
  const PIPE_WIDTH = 50;  
  const PIPE_SPACING = 300; // Espacio entre los pipes

  const [birdY, setBirdY] = useState(300);
  const [pipes, setPipes] = useState([{ position: 1000, gapPosition: Math.floor(Math.random() * (window.innerHeight - GAP_HEIGHT)) }]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                setBirdY(prev => prev + 20);
                break;
            case 'ArrowDown':
                setBirdY(prev => prev - 20);
                break;
            default:
                break;
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameInterval = setInterval(() => {
        // Mover todos los pipes existentes hacia la izquierda
        setPipes(prevPipes => prevPipes.map(pipe => ({ ...pipe, position: pipe.position - 5 })));

        // Si el pipe más a la izquierda ha salido de la pantalla, elimínalo
        setPipes(prevPipes => prevPipes.filter(pipe => pipe.position > -PIPE_WIDTH));

        // Generar un nuevo pipe si es necesario
        setPipes(prevPipes => {
            const lastPipePosition = prevPipes[prevPipes.length - 1].position;
            if (lastPipePosition <= window.innerWidth - PIPE_SPACING) {
                const newPipe = {
                    position: window.innerWidth,
                    gapPosition: Math.floor(Math.random() * (window.innerHeight - GAP_HEIGHT))
                };
                return [...prevPipes, newPipe];
            }
            return prevPipes;
        });

    }, 20);

    return () => {
        clearInterval(gameInterval);
        window.removeEventListener('keydown', handleKeyDown);
    };
}, []);
  

  return (
    <div>
      <Bird birdY={birdY} />
      {pipes.map((pipe, index) => <Pipe key={index} height={pipe.gapPosition} position={pipe.position} />)}
    </div>
  );
}

export default App;
