import React, { useState } from 'react';

export default function Controller({ onModeChange }) {
  const [selectedMode, setSelectedMode] = useState('');

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onModeChange(mode); 
  };

  return (
    <div className='controller-wrapper'>
      <div>Time</div>
      <div className='controller-mode'>
        <button className='controller-mode-button' onClick={() => handleModeChange('30s')} disabled={selectedMode === '30s'}>
          30
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('60s')} disabled={selectedMode === '60s'}>
          60
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('120s')} disabled={selectedMode === '120s'}>
          120
        </button>
      </div>
      <div>Words</div>
      <div className='controller-mode'>
        <button className='controller-mode-button' onClick={() => handleModeChange('60w')} disabled={selectedMode === '60w'}>
          60
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('120w')} disabled={selectedMode === '120w'}>
          120
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('180w')} disabled={selectedMode === '180w'}>
          180
        </button>
      </div>
    </div>
  );
}
