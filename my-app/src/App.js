import React, {useEffect, useState} from 'react';
import './index.css';
import SearchFormHTML from './components/SearchForm';
import apiKey from './components/config';

const App = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchCatPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
        );
        if (response.ok) {
          const data = await response.json();
          setPhotos(data.photos.photo);
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      } catch (error) {
        console.error('Error fetching cat photos:', error);
      }
    };
  
    fetchCatPhotos();
  }, []);
  
  //
  return (
    <div className='container'>
      <SearchFormHTML />
      <div className="photo-container">
      <h2>Cat Photos</h2>
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
  </div>
 );

        }
export default App;
