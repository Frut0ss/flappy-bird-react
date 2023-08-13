import React from 'react';

function Pipe({ height, position }) {
  return (
    <div style={{ position: 'absolute', right: position, width: '50px', height: `${height}px`, backgroundColor: 'green' }}>
    </div>
  );
}

export default Pipe;
