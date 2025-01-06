import React from 'react';
import './TrackListContainer.css'; // Optional: Create a corresponding CSS file for styling

const TrackListContainer = ({ tracks, currentTrackIndex, playTrack, isPlaying }) => {
  return (
    <div className="track-list-container">
      <table className="track-list">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr
              key={index}
              className={`track-item ${index === currentTrackIndex ? 'active' : ''}`}
              onClick={() => playTrack(index)}
            >
              <td>{index + 1}</td>
              <td>{track.name}</td>
              <td>{index === currentTrackIndex ? (isPlaying ? 'Playing' : 'Paused') : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackListContainer;
