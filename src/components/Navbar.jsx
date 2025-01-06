import React from 'react';
import './Navbar.css'; // Make sure to create a corresponding CSS file for styling

const Navbar = ({ currentTrack, onBrowseClick }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="navbar-button" onClick={onBrowseClick}>Browse</button>
      </div>
      <div className="navbar-center">
        <h2>{currentTrack ? currentTrack.name : "No Track Playing"}</h2>
      </div>
      <div className="navbar-right">
        {/* You can add additional icons or buttons here */}
        <button className="navbar-button">Settings</button>
        <button className="navbar-button">Help</button>
      </div>
    </div>
  );
};

export default Navbar;
