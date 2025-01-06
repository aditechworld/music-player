import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import Navbar from './Navbar';
import TrackListContainer from './TrackList';
import FooterPlayer from './FooterPlayer';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const loadTracks = async () => {
    try {
      const handle = await window.showDirectoryPicker();
      const fileEntries = [];
      for await (const entry of handle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.mp3')) {
          const file = await entry.getFile();
          fileEntries.push({ name: file.name, src: URL.createObjectURL(file) });
        }
      }
      setTracks(fileEntries);
    } catch (error) {
      console.error('Error accessing directory:', error);
    }
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };
      audio.addEventListener('timeupdate', updateTime);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, []);

  const handleSeekBarChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="music-player full-screen">
      <Navbar currentTrack={currentTrackIndex !== null ? tracks[currentTrackIndex] : null} onBrowseClick={loadTracks} />
      
      {tracks.length > 0 && (
        <TrackListContainer 
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          playTrack={playTrack}
          isPlaying={isPlaying}
        />
      )}

      <FooterPlayer 
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        currentTime={currentTime}
        duration={duration}
        handleSeekBarChange={handleSeekBarChange}
        formatTime={formatTime}
      />

      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        }}
      ></audio>
    </div>
  );
};

export default MusicPlayer;
