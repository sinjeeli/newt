import React from 'react';

const Dogs = ({ photos }) => {
  return (
    <div>
      <h2>Dog Photos</h2>
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
