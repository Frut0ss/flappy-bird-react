// App.js
import React, { useState, useEffect } from 'react';
import Bird from './components/bird';
import Pipe from './components/pipe';
import fondo from './static/fondo.jpg';

function App() {
  const GAP_HEIGHT = 150;
  const PIPE_WIDTH = 50;
  const PIPE_SPACING = 500;
  const BIRD_X = 50;
  const BIRD_HEIGHT = 40;
  const BIRD_WIDTH = 40;
  const GRAVITY = 1;
  const FLAP_POWER = 15;

  const [hasStarted, setHasStarted] = useState(false);
  const [birdY, setBirdY] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdX, setBirdX] = useState(BIRD_X); // Nuevo estado para la posición horizontal
  const [pipes, setPipes] = useState([{ position: window.innerWidth, gapPosition: Math.floor(Math.random() * (window.innerHeight - GAP_HEIGHT)) }]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleKeyDown = (event) => {
    if (!isGameOver) {
      if (!hasStarted && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        setHasStarted(true);
      }
      if (event.key === 'ArrowUp') {
        setBirdVelocity(-FLAP_POWER);
      }
    }
  };

  const horizontalSpeed = 1; // Puedes ajustar este valor según tus preferencias

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    const gameInterval = setInterval(() => {
      if (hasStarted && !isGameOver) {
        setBirdY(prev => prev + birdVelocity);
        setBirdVelocity(prev => prev + GRAVITY);
        setBirdX(prev => prev + horizontalSpeed); // Actualizamos la posición horizontal

        if (birdY <= 0 || birdY + BIRD_HEIGHT >= window.innerHeight) {
          setIsGameOver(true);
          return;
        }

        setPipes(prevPipes => {
          const newPipes = prevPipes.map(pipe => ({ ...pipe, position: pipe.position - 5 }));

          const lastPipePosition = newPipes[newPipes.length - 1].position;
          if (lastPipePosition <= window.innerWidth - PIPE_SPACING) {
            const newPipe = {
              position: window.innerWidth,
              gapPosition: Math.floor(Math.random() * (window.innerHeight - GAP_HEIGHT))
            };
            newPipes.push(newPipe);
          }

          for (let pipe of newPipes) {
            if (birdX > pipe.position + PIPE_WIDTH && !pipe.counted) {
              pipe.counted = true;
              setScore(prevScore => prevScore + 20);
            }
          }

          return newPipes.filter(pipe => pipe.position > -PIPE_WIDTH);
        });

        if (checkCollision()) {
          setIsGameOver(true);
        }
      }
    }, 20);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [birdVelocity, isGameOver, hasStarted, birdY, birdX]); // Agregamos birdX

  const checkCollision = () => {
    for (let pipe of pipes) {
      if (
        (birdY + 35 <= pipe.gapPosition || birdY + BIRD_HEIGHT - 35 >= pipe.gapPosition + GAP_HEIGHT) &&
        birdX + BIRD_WIDTH - 35 >= pipe.position &&
        birdX + 35 <= pipe.position + PIPE_WIDTH
      ) {
        return true;
      }
    }
    return false;
  };

  const restartGame = () => {
    setIsGameOver(false);
    setHasStarted(false);
    setBirdY(300);
    setBirdX(BIRD_X); // Restauramos la posición horizontal del pájaro
    setBirdVelocity(0);
    setScore(0);
    setPipes([{ position: window.innerWidth, gapPosition: Math.floor(Math.random() * (window.innerHeight - GAP_HEIGHT)) }]);
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative' }}>
      <Bird birdY={birdY} birdX={birdX} />
      {pipes.map((pipe, index) => <Pipe key={index} height={pipe.gapPosition} position={pipe.position} />)}
      {isGameOver && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 1000, color: 'white', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '8px' }}>
            <h1>Game Over</h1>
            <p>Total Score: {score}</p> {/* Agregamos el puntaje total */}
            <button onClick={restartGame}>Restart</button>
        </div>
      )}
      {!hasStarted && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 1000, color: 'white', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '8px' }}>
          <h1>Presiona flecha hacia arriba o flecha hacia abajo para empezar</h1>
        </div>
      )}
      <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '24px', color: 'white', zIndex: 1000 }}>
        Score: {score}
      </div>
    </div>
  );
}

export default App;
