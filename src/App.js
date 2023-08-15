// App.js
import React, { useState, useEffect } from 'react';
import Bird from './components/bird';
import Pipe from './components/pipe';
import fondo from './static/fondo.jpg';
import Menu from './components/menu';
import Part2 from './components/part2';


function App() {
  const GAP_HEIGHT = 150;
  const PIPE_WIDTH = 50;
  const PIPE_SPACING = 500;
  const BIRD_X = 50;
  const BIRD_HEIGHT = 40;
  const BIRD_WIDTH = 40;
  const GRAVITY = 1;
  const FLAP_POWER = 15;
 
  const [currentGame, setCurrentGame] = useState('flappybird');  // Nuevo estado para manejar el juego activo
  const [flash, setFlash] = useState(false);
  const [birdImage, setBirdImage] = useState(null); // Si tienes una imagen predeterminada del pájaro, puedes ponerla aquí.
  const [background, setBackground] = useState(fondo);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

const customizeBird = () => {
    // Crear un input de tipo file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';  // Aceptar solo imágenes

    // Escuchar el evento 'change' para cuando el usuario haya seleccionado un archivo
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Utilizar FileReader para convertir la imagen a URL de datos (base64)
            const reader = new FileReader();
            reader.onload = (e) => {
                // Establecer la URL de datos como imagen del pájaro
                setBirdImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Disparar la selección de archivo
    fileInput.click();
};

  const customizeBackground = () => {
    // Crear un input de tipo file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';  // Aceptar solo imágenes

    // Escuchar el evento 'change' para cuando el usuario haya seleccionado un archivo
    fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        // Utilizar FileReader para convertir la imagen a URL de datos (base64)
        const reader = new FileReader();
        reader.onload = (e) => {
            // Establecer la URL de datos como imagen del pájaro
            setBackground(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Disparar la selección de archivo
fileInput.click();
  };



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
                if (score >= 40) {
                  setCurrentGame('part2');
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
}, [birdVelocity, isGameOver, hasStarted, birdY, birdX, handleKeyDown, score]);

  const checkCollision = () => {
    for (let pipe of pipes) {
      if (
        (birdY + 0 <= pipe.gapPosition || birdY + BIRD_HEIGHT - 0 >= pipe.gapPosition + GAP_HEIGHT) &&
        birdX + BIRD_WIDTH - 0 >= pipe.position &&
        birdX + 0 <= pipe.position + PIPE_WIDTH
      ) {
        setFlash(true);
        setTimeout(() => setFlash(false), 300); // Desactiva el flashazo después de 300ms
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
    <div style={{ backgroundImage: `url(${background})`, height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative' }}>
        
      {currentGame === 'flappybird' ? (
        <>
          {isMenuOpen ? (
            <Menu 
              onStart={() => setIsMenuOpen(false)}
              onCustomizeBird={customizeBird}
              onCustomizeBackground={customizeBackground}
            />
          ) : (
            <>
              <Bird birdY={birdY} birdX={birdX} birdImage={birdImage} />
              {pipes.map((pipe, index) => <Pipe key={index} height={pipe.gapPosition} position={pipe.position} />)}
              
              {isGameOver && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 1000, color: 'white', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '8px' }}>
                  <h1>Jueguito terminado</h1>
                  <p>Puntuación total: {score}</p>
                  <button 
                    onClick={restartGame} 
                    style={{
                      backgroundColor: '#f08a5d',
                      border: 'none',
                      color: 'white',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#b83b5e'
                      }
                    }}
                  >
                    Reiniciar
                  </button>
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
            </>
          )}
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'red', 
              opacity: flash ? 1 : 0,
              transition: 'opacity 300ms ease',
              pointerEvents: 'none' 
            }} 
          ></div>
        </>
      ) : (
        <Part2 />
      )}
    </div>
  );
} 
export default App;
