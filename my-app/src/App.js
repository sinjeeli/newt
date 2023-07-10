import React, { useState, useEffect } from 'react';
import SearchFormHTML from './components/SearchForm';
import apiKey from './components/config';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cats from './components/Cats';
import Dogs from './components/Dogs';
import Home from './components/Home';
import Computers from './components/Computers';
import NotFound from './components/NotFound';
import './index.css';
import SearchResults from './components/SearchResults';
import Photo from './components/Photo';
import Nav from './components/Nav';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchQuery) => {
    try {
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
      console.error('Error fetching photos:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      window.location.href = '/';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <div className="container">
        <SearchFormHTML handleSearch={handleSearch} />
        <Nav />
        <Routes>
          <Route path="/" element={<Home handleSearch={handleSearch} />} />
          <Route path="/cats" element={<Cats handleSearch={handleSearch} />} />
          <Route path="/dogs" element={<Dogs handleSearch={handleSearch} />} />
          <Route path="/computers" element={<Computers handleSearch={handleSearch} />} />
          <Route
            path="/search"
            element={<SearchResults searchResults={searchResults} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


//project complete