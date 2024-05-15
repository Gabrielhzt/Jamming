import React from "react";
import './Info.css';
import Spotify from "../API/Spotify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMusic, faUser } from '@fortawesome/free-solid-svg-icons';

const Info = ({ token, setToken }) => {

    const handleLogout = () => {
        Spotify.handleLogout(setToken);
    };

    return (
        <div className="all-info">
            <div className="head">
                <button className="my-playlist-btn">
                    <FontAwesomeIcon icon={faMusic} size="lg" />
                    <p>Your Playlist</p>
                </button>
                {token ? (
                    <button className="profile-icon">
                        <FontAwesomeIcon icon={faUser} size="xl" />
                    </button>
                ):(
                    <div>
                        <a href={Spotify.link()} className="login">Login to Spotify</a>
                    </div>
                )}
            </div>
            <div className="playlist-info">
                <div className="big-img"></div>
                <div className="info">
                    <h1>My playlist</h1>
                    <p>Limited Launch Special pricing is subject to change without notice; and everything you see.</p>
                    <div className="playlist-btn">
                        <button className="add-to">Add to spotify</button>
                        <button className="put">Modify the playlist</button>
                    </div>
                </div>
            </div>
            <div className="playlist-song">
                <div className="song">
                    <div className="song-info">
                        <div className="img"></div>
                        <div className="text-song">
                            <h3>Full stack engineer</h3>
                            <p>Gabrielhzt</p>
                        </div>
                    </div>
                    <p>Self-learner</p>
                    <button className="remove"><FontAwesomeIcon icon={faMinus} size="xl" /></button>
                </div>
                <div className="song">
                    <div className="song-info">
                        <div className="img"></div>
                        <div className="text-song">
                            <h3>Full stack engineer</h3>
                            <p>Gabrielhzt</p>
                        </div>
                    </div>
                    <p>Self-learner</p>
                    <button className="remove"><FontAwesomeIcon icon={faMinus} size="xl" /></button>
                </div>
                <div className="song">
                    <div className="song-info">
                        <div className="img"></div>
                        <div className="text-song">
                            <h3>Full stack engineer</h3>
                            <p>Gabrielhzt</p>
                        </div>
                    </div>
                    <p>Self-learner</p>
                    <button className="remove"><FontAwesomeIcon icon={faMinus} size="xl" /></button>
                </div>
                <div className="song">
                    <div className="song-info">
                        <div className="img"></div>
                        <div className="text-song">
                            <h3>Full stack engineer</h3>
                            <p>Gabrielhzt</p>
                        </div>
                    </div>
                    <p>Self-learner</p>
                    <button className="remove"><FontAwesomeIcon icon={faMinus} size="xl" /></button>
                </div>
            </div>
        </div>
    )
}

export default Info;