import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Dogs = ({ handleSearch }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch the initial set of photos for the home page
    const fetchPhotos = async () => {
      try {
        const data = await handleSearch('dogs'); // Use the handleSearch function passed from props
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [handleSearch]);

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

Dogs.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Dogs;
