import React, {useEffect, useState} from 'react';
import './index.css';
import SearchFormHTML from './components/SearchForm';
import apiKey from './components/config';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cats from './components/Cats';
import Dogs from './components/Dogs';
import Home from './components/Home';
import Computers from './components/Computers';
import NotFound from './components/NotFound';

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
    <Router>
    <div className='container'>
      <SearchFormHTML />
      <Routes>
        <Route exact path='/' element={Home} />
        <Route path='/cats' element={Cats} />
        <Route path='/dogs' element={Dogs} />
        <Route path='/computers' element={Computers} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
 );

        }
export default App;
