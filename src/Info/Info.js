import React, { useState } from "react";
import './Info.css';
import Spotify from "../API/Spotify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMusic, faUser } from '@fortawesome/free-solid-svg-icons';

const Info = ({ token, setToken }) => {
    const [put, setPut] = useState(false)
    const [title, setTitle] = useState('My playlist')
    const [description, setDescription] = useState('Descripe the mood of your playlist')
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('Descripe the mood of your playlist')

    const handleLogout = () => {
        Spotify.handleLogout(setToken);
    };

    const handleChange = () => {
        setTitle(newTitle)
        setDescription(newDescription)
    }

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
                {put ? (
                    <div className="info">
                        <input 
                            type="text" 
                            placeholder={title} 
                            className="playlist-title" 
                            onChange={e => setNewTitle(e.target.value)}
                        />
                        <textarea 
                            rows="2" 
                            cols="50" 
                            maxlength="150" 
                            className="playlist-description"
                            onChange={e => setNewDescription(e.target.value)}
                        >
                            {description}
                        </textarea>
                        <div className="playlist-btn">
                        <button className="add-to" onClick={() => { setPut(false); handleChange(); }}>
                            Validate the changes
                        </button>
                        </div>
                    </div>
                ):(
                    <div className="info">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <div className="playlist-btn">
                            <button className="add-to">Add to spotify</button>
                            <button className="put" onClick={() => setPut(true)}>Modify the playlist</button>
                        </div>
                    </div>
                )}
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
            </div>
        </div>
    )
}

export default Info;