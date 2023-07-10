import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Cats = ({ handleSearch }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch the initial set of photos for the cats page
    fetchPhotos('cats');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPhotos = async (searchQuery) => {
    try {
      if (searchQuery === '') {
        setPhotos([]); // Clear the photos array
      } else {
        const data = await handleSearch(searchQuery);
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhotos('');
  };

  return (
    <div>
      <h2>Cats Photos</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Clear Search</button>
      </form>
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

Cats.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Cats;
