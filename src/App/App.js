import React, { useEffect, useState } from 'react';
import './App.css';
import Search from '../Search/Search';
import Info from '../Info/Info';
import Spotify from '../API/Spotify';
import Playlist from '../Playlist/Playlist';
import Profile from '../Profile/Profile';

const App = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem('token') || '');
  const [uris, setUris] = useState([]);
  const [takeid, setTakeId] = useState([]);
  const [userId, setUserId] = useState();
  const [page, setPage] = useState('Playlist');
  const [fetchedTracks, setFetchedTracks] = useState([]);
  const [playlist, setPlaylist] = useState(true)

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

  useEffect(() => {
    if (takeid.length !== 0) {
        const fetchTracks = async () => {
            try {
                const allIds = fetchedTracks.map((e) => e.id)
                if (allIds.includes(takeid)) {
                    return;
                }
                const response = await Spotify.getTracksById(token, takeid);
                setFetchedTracks(prev => [...prev, response]);
                setTakeId([])
            } catch (error) {
                console.error('Error fetching track:', error);
            }
        };
    
        fetchTracks();
    }
}, [takeid, fetchedTracks, token]);

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
        <Info token={token} setToken={setToken} takeId={takeid} setTakeId={setTakeId} uris={uris} setUris={setUris} userId={userId} setUserId={setUserId} fetchedTracks={fetchedTracks} setFetchedTracks={setFetchedTracks} playlist={playlist} setPlaylist={setPlaylist} setPage={setPage} />
      </div>
      <div className={page === 'Playlist' ? 'box-4-active' : 'box-4'} onClick={() => setPage('Playlist')}>
        <p>Playlist</p>
      </div>
      <div className={page === 'Search' ? 'box-5-active' : 'box-5'} onClick={() => setPage('Search')}>
        <p>Search</p>
      </div>
      <div className={page === 'Profile' ? 'box-6-active' : 'box-6'} onClick={() => setPage('Profile')}>
        <p>Profile</p>
      </div>
      {token ? (
        <div className='box-7'>
          {page === 'Playlist' ? (
            <Playlist token={token} setToken={setToken} takeId={takeid} setTakeId={setTakeId} uris={uris} setUris={setUris} userId={userId} fetchedTracks={fetchedTracks} setFetchedTracks={setFetchedTracks} />
          ) : page === 'Search' ? (
            <Search token={token} setToken={setToken} setUris={setUris} setId={setTakeId} />
          ) : page === 'Profile' ? (
            <Profile token={token} setToken={setToken} userId={userId} playlist={playlist} setPlaylist={setPlaylist} setPage={setPage} />
          ) : null}
        </div>
      ):(
        <div className='box-8'>
          <a href={Spotify.link()} className="login">Login to Spotify</a>
        </div>
      )}
    </div>
  )
}

export default App;
