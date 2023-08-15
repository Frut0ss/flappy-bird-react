import React, { useState } from 'react';
import birdImageDefault from '../static/pajaro.png';
import gptlogo from '../static/gptlogo.png';
import background from '../static/background-pokemon.jpg';
import ProgressBar from './progressbar';

function Part2() {
    const [userPokemon, setUserPokemon] = useState({
        hp: 100,
        moves: ['Tackle', 'Quick Attack', 'Hyper Beam', 'Earthquake']
    });

    const [aiPokemon, setAIPokemon] = useState({
        hp: 100,
        moves: ['Scratch', 'Bite', 'Thunderbolt', 'Water Gun']
    });

    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [aiAttackMessage, setAIAttackMessage] = useState('');

    const [userAttacking, setUserAttacking] = useState(false);
    const [aiAttacking, setAIAttacking] = useState(false);

    const handleUserAttack = (move) => {
        // Animación del ataque del usuario
        setUserAttacking(true);
        
        const damageToAI = Math.floor(Math.random() * 30) + 10; // Daño aleatorio entre 10 y 40
        setAIPokemon(prevState => ({ ...prevState, hp: Math.max(prevState.hp - damageToAI, 0) }));

        const aiMove = aiPokemon.moves[Math.floor(Math.random() * aiPokemon.moves.length)];
        setAIAttackMessage(`IA ha utilizado ${aiMove}!`);

        if (aiPokemon.hp - damageToAI <= 0) {
            setMessage('¡Has ganado!');
            setGameOver(true);
            return;
        }

        // Animación del ataque de la IA (puedes ajustar el tiempo según lo necesites)
        setTimeout(() => {
            setAIAttacking(true);
            const damageToUser = Math.floor(Math.random() * 30) + 10;
            setUserPokemon(prevState => ({ ...prevState, hp: Math.max(prevState.hp - damageToUser, 0) }));
            
            if (userPokemon.hp - damageToUser <= 0) {
                setMessage('Has perdido...');
                setGameOver(true);
            }

            setTimeout(() => setAIAttacking(false), 500);
        }, 500);

        setTimeout(() => setUserAttacking(false), 500);
    };

    return (
      <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          background: `url(${background}) no-repeat center center fixed`,
          backgroundSize: 'cover'
      }}>
          <div style={{ 
              display: 'flex', 
              width: '80%', 
              justifyContent: 'space-between', 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)'
          }}> 
              <div style={{ position: 'relative', top: '120px' }}>
                  <img 
                      src={birdImageDefault} 
                      alt="Tu Pokémon" 
                      width={150} 
                      style={{
                          animation: userAttacking ? 'attackAnimation 0.5s' : aiAttacking ? 'damageAnimation 0.5s' : ''
                      }}
                  />
                  <div style={{ 
                      backgroundColor: 'rgba(255,255,255,0.7)', 
                      padding: '15px', 
                      borderRadius: '10px', 
                      marginTop: '0px'
                  }}>
                      <h2>Pajarito</h2>
                      <ProgressBar hp={userPokemon.hp} maxHp={100} />
                      <p>HP: {userPokemon.hp}</p>
                      {userPokemon.moves.map(move => (
                          <button 
                              key={move}
                              onClick={() => handleUserAttack(move)}
                              disabled={gameOver}
                              style={{
                                  margin: '5px',
                                  padding: '10px 20px',
                                  borderRadius: '20px',
                                  backgroundColor: '#FFCB05',
                                  border: 'none',
                                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
                                  cursor: 'pointer',
                                  fontSize: '16px'
                              }}
                          >
                              {move}
                          </button>
                      ))}
                  </div>
              </div>
              <div style={{ position: 'relative', bottom: '100px', right: '120px' }}>
                  <img 
                      src={gptlogo}
                      alt="IA Pokémon"
                      width={150}
                      style={{
                          animation: aiAttacking ? 'attackAnimation 0.5s' : userAttacking ? 'damageAnimation 0.5s' : ''
                      }}
                  />
                  <div style={{
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      padding: '15px',
                      borderRadius: '10px',
                      marginTop: '10px'
                  }}>
                      <h2>GPT</h2>
                      <ProgressBar hp={aiPokemon.hp} maxHp={100} />
                      <p>HP: {aiPokemon.hp}</p>
                  </div>
              </div>
          </div>
          {aiAttackMessage && !gameOver && (
              <p style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '5px', borderRadius: '10px' }}>{aiAttackMessage}</p>
          )}
          {gameOver && (
              <h2 style={{ 
                  color: message === '¡Has ganado!' ? '#4CAF50' : '#F44336', 
                  position: 'absolute', 
                  bottom: '10%', 
                  backgroundColor: 'rgba(255,255,255,0.7)', 
                  padding: '5px', 
                  borderRadius: '10px'
              }}>
                  {message}
              </h2>
          )}
      </div>
  );
}

export default Part2;
