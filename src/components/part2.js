import React, { useState, useEffect } from 'react';

const gridSize = 10; // Por simplicidad, vamos a tener una cuadrícula 10x10

const initialPills = Array(gridSize).fill(0).map(() => Array(gridSize).fill(true)); // Todas las casillas contienen una píldora al inicio

const Part2 = () => {

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>¡Bienvenido a la siguiente funcionalidad!</h1>
      <div>
        {/* Puedes renderizar tu cuadrícula y personajes aquí */}
      </div>
    </div>
  );
}

export default Part2;
