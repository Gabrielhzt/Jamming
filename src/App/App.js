import React, { useEffect, useState } from 'react';
import './App.css';
import Search from '../Search/Search';
import Info from '../Info/Info';
import Spotify from '../API/Spotify';

const App = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem('token') || '');
  const [uris, setUris] = useState([]);
  const [takeid, setTakeId] = useState([]);
  const [userId, setUserId] = useState();

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

  useEffect(() => {
    const fetchProfile = async () => {
        if(token) {
          try {
            const profile = await Spotify.getProfile(token);
            setUserId(profile.id)
          } catch (error) {
              console.error('Error getting profile:', error);
              Spotify.handleLogout(setToken)
          }
        }else {
          return
        }
    };

    fetchProfile();
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
        <Info token={token} setToken={setToken} takeId={takeid} setTakeId={setTakeId} uris={uris} setUris={setUris} userId={userId} setUserId={setUserId} />
      </div>
    </div>
  )
}

export default App;
