// ProgressBar.js
import React from 'react';

function ProgressBar({ hp, maxHp }) {
    const percentage = (hp / maxHp) * 100;

    let color;
    if (percentage > 50) {
        color = 'green';
    } else if (percentage > 20) {
        color = 'yellow';
    } else {
        color = 'red';
    }

    return (
        <div style={{ width: '100%', height: '20px', backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: color }}></div>
        </div>
    );
}

export default ProgressBar;