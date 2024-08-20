import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthContext } from './Context/AuthContext';// Adjust the path as necessary
import { PlayerContext } from './Context/PlayerContext';

function App() {
  const { user } = useContext(AuthContext); // Access authentication context
  const { audioRef, track } = useContext(PlayerContext); // Access player context

  return (
    <div className="h-screen bg-black">
      <Routes>
        {/* Route for Signup */}
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        {/* Route for Login */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        {/* Main Application Route */}
        <Route
          path="/"
          element={user ? (
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
              <Player />
              {/* Audio component */}
              <audio ref={audioRef} src={track.file} preload="auto"></audio>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;