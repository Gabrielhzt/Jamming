import React, { useEffect, useState } from "react";
import './Profile.css';
import Spotify from "../API/Spotify";

const Profile = ({ token, setToken, setPlaylist, userId, setPage }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [userPlaylist, setUserPlaylist] = useState([]);

    useEffect(() => {
        if(token) {
            const fetchProfile = async () => {
                try {
                    const profile = await Spotify.getProfile(token);
                    setUserProfile(profile)
                } catch (error) {
                    console.error('Error getting profile:', error);
                    
                }
            };
    
            const fetchUserPlaylists = async () => {
                try {
                    const response = await Spotify.getUserPlaylists(token, userId);
                    setUserPlaylist(response.items)
                } catch (error) {
                    console.error('Error fetching user Playlists:', error)
                }
            }
            
        
            fetchUserPlaylists()
            fetchProfile();
        }
      }, [token, userId]);

    const handleLogout = () => {
        Spotify.handleLogout(setToken);
        setPlaylist(true);
        setPage('Playlist')
    };

    return (
        <>
            {userProfile !== null && (
                <div>
                    <div className="profile-info">
                        <div className="playlist-btn" >
                            <h1>{userProfile.display_name}</h1>
                            <p>{userProfile.followers.total} followers</p>
                        </div>
                        <div className="playlist-btn">
                            <a href={userProfile.external_urls.spotify} target="_blank" rel="noreferrer"><button className="add-to">Go to my Spotify Profile</button></a>
                            <button className="put" onClick={handleLogout}>Log out</button>
                        </div>
                    </div>
                    <div className="all-playlist">
                        <h2>All Your Playlists</h2>
                        <div className="align">
                            {userPlaylist.slice(0, 5).map((playlist) => (
                                <div className="flex" key={playlist.id}>
                                    {playlist.images && playlist.images.length > 0 && (
                                        <img src={playlist.images[0].url} alt="playlist-img" className="little-img" />
                                    )}
                                    <div className="text-playlist">
                                        <h3>{playlist.name}</h3>
                                        <a href={playlist.external_urls.spotify} target="blank"><button className="little-btn">Listen it</button></a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile;