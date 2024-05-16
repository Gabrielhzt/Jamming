import React, { useState } from "react";
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Spotify from "../API/Spotify";

const Search = ({ token, setToken, setUris, setId }) => {
    const [searchKey, setSearchKey] = useState('');
    const [result, setResult] = useState([]);

    const handleSearch = async () => {
        if(searchKey.length !== 0) {
            try {
                const response = await Spotify.getTracks(token, searchKey)
                setResult(response.tracks.items);
            } catch (error) {
                setToken('')
                console.error('Error searching tracks:', error);
            }
        }
    };

    const handleAdd = (uri, id) => {
        setUris(prevUris => [...prevUris, uri]);
        setId(id);
    }

    return (
        <div className="search-box">
            <div className="all-input">
                <input 
                    type="text" 
                    placeholder="Enter a song title" 
                    className="input" 
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button className="input-btn" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" /></button>
            </div>
            {result.length > 0 && (
                <div className="result">
                    {result.map((track) => (
                        <div key={track.id} className="song">
                            <div className="song-info">
                                <img src={track.album.images[0].url} alt={track.name} className="img" />
                                <div className="text-song">
                                    <h3>{track.name}</h3>
                                    <p>{track.artists[0].name}</p>
                                </div>
                            </div>
                            <button className="add" onClick={() => handleAdd(track.uri, track.id)} ><FontAwesomeIcon icon={faPlus} size="lg" /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
