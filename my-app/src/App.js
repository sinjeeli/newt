import React from 'react';
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
  const handleSearch = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&per_page=24&format=json&nojsoncallback=1`
      );
      if (response.ok) {
        const data = await response.json();
        return data.photos.photo; // Return the fetched photos data directly
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      return []; // Return an empty array in case of an error
    }
  };
  
  return (
    <Router>
      <div className="container">
        <SearchFormHTML handleSearch={handleSearch} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home handleSearch={handleSearch} />}
          />
          <Route
            path="/cats"
            element={<Cats handleSearch={handleSearch} />}
          />
          <Route
            path="/dogs"
            element={<Dogs handleSearch={handleSearch} />}
          />
          <Route
            path="/computers"
            element={<Computers handleSearch={handleSearch} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
