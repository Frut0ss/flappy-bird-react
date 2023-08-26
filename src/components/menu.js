import React from 'react';
import menuBackground from '../static/flappybird-fondo-menu.png';

const menuStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 1000,
    color: 'white',
    background: 'rgba(0,0,0,0.7)',
    padding: '20px',
    borderRadius: '8px',
    overflow: 'hidden'
};

const imageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: `url(${menuBackground}) no-repeat right center`,
    backgroundSize: '60% auto',
    height: '200px',
    marginBottom: '20px'
};

const casiTextStyle = {
    fontSize: '80px',
    fontWeight: 'bold',
    marginLeft: '10px',
    marginBottom: '20px',
};

const buttonStyle = {
    background: '#3498db',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',

    '&:hover': {
        background: '#2980b9',
    }
};

function Menu({ onStart, onCustomizeBird, onCustomizeBackground }) {
    return (
        <div style={menuStyle}>
            <div style={imageContainerStyle}>
                <span style={casiTextStyle}>CASItest</span>
            </div>
            <h1>Bienvenido al juego</h1>
            <button style={buttonStyle} onClick={onStart}>Empezar juego</button>
            <button style={buttonStyle} onClick={onCustomizeBird}>Personalizar pájaro</button>
            <button style={buttonStyle} onClick={onCustomizeBackground}>Personalizar fondo</button>
        </div>
    );
}

export default Menu;
