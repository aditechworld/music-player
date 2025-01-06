import React from 'react';
import './FooterPlayer.css'; // Optional: Create a corresponding CSS file for styling

const FooterPlayer = ({ isPlaying, togglePlay, currentTime, duration, handleSeekBarChange, formatTime }) => {
  return (
    <div className="footer-player">
      <div className="controls">
        <button onClick={togglePlay} className="play-pause-btn">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="seek-bar-container">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeekBarChange}
          className="seek-bar"
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default FooterPlayer;
