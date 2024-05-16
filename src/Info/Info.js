import React, { useEffect, useState } from "react";
import './Info.css';
import Spotify from "../API/Spotify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMusic, faUser } from '@fortawesome/free-solid-svg-icons';

const Info = ({ token, setToken, takeId, setTakeId, uris, setUris, userId }) => {
    const [put, setPut] = useState(false)
    const [title, setTitle] = useState('My playlist')
    const [description, setDescription] = useState('Descripe the mood of your playlist.')
    const [newTitle, setNewTitle] = useState('My Playlist')
    const [newDescription, setNewDescription] = useState('Descripe the mood of your playlist.')
    const [fetchedTracks, setFetchedTracks] = useState([]);

    useEffect(() => {
        if (takeId.length !== 0) {
            const fetchTracks = async () => {
                try {
                    const allIds = fetchedTracks.map((e) => e.id)
                    if (allIds.includes(takeId)) {
                        return;
                    }
                    const response = await Spotify.getTracksById(token, takeId);
                    setFetchedTracks(prev => [...prev, response]);
                    setTakeId([])
                } catch (error) {
                    console.error('Error fetching track:', error);
                }
            };
        
            fetchTracks();
        }
    }, [takeId]);

    const handleChange = () => {
        setTitle(newTitle)
        setDescription(newDescription)
    }

    const removeTrack = (id, uri) => {
        const updatedTracks = fetchedTracks.filter(track => track.id !== id);
        const updatedTracksUris = uris.filter(trackUri => trackUri !== uri);
        setFetchedTracks(updatedTracks);
        setUris(updatedTracksUris);
    };


    const importToSpotify = async () => {
        if(uris.length > 0) {
            Spotify.importAlbum(token, userId, title, description, uris)
            setTitle('My Playlist')
            setDescription('Descripe the mood of your playlist.')
            setUris([])
            setTakeId([])
            setFetchedTracks([])
        }else {
            console.log('Add Tracks to your playlist')
        }
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
                            maxLength="150" 
                            value={newDescription}
                            className="playlist-description"
                            onChange={e => setNewDescription(e.target.value)}
                        ></textarea>
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
                            <button className="add-to" onClick={importToSpotify}>Add to spotify</button>
                            <button className="put" onClick={() => setPut(true)}>Modify the playlist</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="playlist-song">
                {fetchedTracks.map((track) => (
                    <div className="song" key={track.id}>
                        <div className="song-info">
                            <img src={track.album.images[0].url} className="img" />
                            <div className="text-song">
                                <h3>{track.name}</h3>
                                <p>{track.album.artists[0].name}</p>
                            </div>
                        </div>
                        <p>{track.album.name}</p>
                        <button className="remove" onClick={() => removeTrack(track.id, track.uri)}><FontAwesomeIcon icon={faMinus} size="xl" /></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Info;