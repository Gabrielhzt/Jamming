import axios from 'axios';

const CLIENT_ID = '54c2998cdeae46688776d1825cf77fc8';
const REDIRECT_URI = 'http://localhost:3000/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

const Spotify = {
  link: () => {
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-public playlist-modify-private playlist-read-private`;
  },

  authenticate: (token, setToken) => {
    const hash = window.location.hash;

    if (!token && hash) {
      const accessToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
      if (accessToken) {
        const retrievedToken = accessToken.split('=')[1];
        setToken(retrievedToken);
        window.localStorage.setItem("token", retrievedToken);     
        window.location.hash = '';
      }
    }
  },

  handleLogout: (setToken) => {
    setToken("");
    window.localStorage.removeItem("token");
  },

  getProfile: async (token) => {
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return data;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  getUserPlaylists: async (token, userId) => {
    try {
      const { data } =  await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data
    } catch (error) {
      console.error('Error getting user playlists:', error)
    }
  },

  getTracks: async (token, searchKey) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "track"
        }
      });

      return data;
    } catch (error) {
      console.error("Error searching albums:", error);
      throw error;
    }
  },

  getTracksById: async (token,id) => {
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return data;
    } catch (error) {
        console.error("Error getting tracks by their id:", error);
        throw error;
    }
  },

  importAlbum: async (token, userId, title, description, uris) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: title,
          description: description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      try {
        const tracks = await axios.post(
          `https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
          {
            uris: uris
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )
      } catch (error) {
        console.error('Error ading tracks in the playlist')
      }


      return response;
    } catch (error) {
      console.error("Error importing album", error);
      throw error;
    }
  }  
};

export default Spotify;