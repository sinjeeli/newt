import React, { useEffect, useState } from 'react';
import apiKey from './config';

const Dogs = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos('dogs');
  }, []);

  const fetchPhotos = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&per_page=24&format=json&nojsoncallback=1`
      );
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos.photo);
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
    }
  };


  return (
    <div>
      <h2>Dogs Photos</h2>
      <ul>
        {photos.map((photo) => (
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

export default Dogs;
