import React, { useEffect, useState } from "react";
import './Info.css';
import Spotify from "../API/Spotify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser } from '@fortawesome/free-solid-svg-icons';
import Playlist from "../Playlist/Playlist";
import Profile from "../Profile/Profile";

const Info = ({ token, setToken, takeId, setTakeId, uris, setUris, userId }) => {
    const [playlist, setPlaylist] = useState(false)

    return (
        <div className="all-info">
            <div className="head">
                <button className="my-playlist-btn" onClick={() => setPlaylist(true)}>
                    <FontAwesomeIcon icon={faMusic} size="lg" />
                    <p>Your Playlist</p>
                </button>
                {token ? (
                    <button className="profile-icon" onClick={() => setPlaylist(false)}>
                        <FontAwesomeIcon icon={faUser} size="xl" />
                    </button>
                ):(
                    <div>
                        <a href={Spotify.link()} className="login">Login to Spotify</a>
                    </div>
                )}
            </div>
            {playlist ? (
                <Playlist token={token} setToken={setToken} takeId={takeId} setTakeId={setTakeId} uris={uris} setUris={setUris} userId={userId} />
            ):(
                <Profile />
            )}
        </div>
    )
}

export default Info;