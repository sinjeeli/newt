import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiKey from './config';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Extract the search query from the URL
    const searchQuery = new URLSearchParams(location.search).get('q');
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [location.search]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      // Perform the search and update the search results state
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&per_page=24&format=json&nojsoncallback=1`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.photos.photo);
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((photo) => (
          <li key={photo.id}>
            <img
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              alt={photo.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
