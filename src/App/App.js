import React, { useEffect, useState } from 'react';
import './App.css';
import Search from '../Search/Search';
import Info from '../Info/Info';

const App = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem('token') || '');
  const [uris, setUris] = useState([]);
  const [takeid, setTakeId] = useState([]);

  useEffect(() => {
    if (!token && window.location.hash) {
      const accessToken = window.location.hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
      if (accessToken) {
        const retrievedToken = accessToken.split('=')[1];
        setToken(retrievedToken);
        window.localStorage.setItem("token", retrievedToken);
        window.location.hash = '';
        setTimeout(() => {
          setToken('');
          window.localStorage.removeItem('token');
        }, 3600000);
      }
    }
  }, [token]);

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
        <Search token={token} setToken={setToken} setUris={setUris} setId={setTakeId} />
      </div>
      <div className='box-3'>
        <Info token={token} setToken={setToken} takeId={takeid} setTakeId={setTakeId} />
      </div>
    </div>
  )
}

export default App;
