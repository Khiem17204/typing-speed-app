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

        <button className='controller-mode-button' onClick={() => handleModeChange('15s')} disabled={selectedMode === '15s'}>
          15
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('30s')} disabled={selectedMode === '30s'}>
          30
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('45s')} disabled={selectedMode === '45s'}>
          45


        </button>
      </div>
      <div>Words</div>
      <div className='controller-mode'>


        <button className='controller-mode-button' onClick={() => handleModeChange('25w')} disabled={selectedMode === '25w'}>
          25
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('50w')} disabled={selectedMode === '50w'}>
          50
        </button>
        <button className='controller-mode-button' onClick={() => handleModeChange('100w')} disabled={selectedMode === '100w'}>
          100
        </button>
      </div>
    </div>
  );
}
