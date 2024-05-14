import React, { useEffect, useState } from 'react';
import './App.css';
import Search from '../Search/Search';
import Spotify from '../API/Spotify';

const App = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem('token') || '');

  useEffect(() => {
    Spotify.authenticate(token, setToken);
  }, [token]);

  const handleLogout = () => {
    Spotify.handleLogout(setToken);
  };

  return (
    <div className='all-boxes'>
      <div className='box-1'>
        <div className='top-logo'>
          <h1>Jammming</h1>
          <p>Powered by Spotify</p>
        </div>
        <h2 className='title'>Let's find something for your playlist</h2>
      </div>
      <div className='box-2'>
        <Search token={token} />
      </div>
      <div className='box-3'>
      {!token ? (
        <a href={Spotify.link()}>Login to Spotify</a>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      </div>
    </div>
  )
}

export default App;
