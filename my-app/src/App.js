import React, {useEffect, useState} from 'react';
import './index.css';
import SearchFormHTML from './components/SearchForm';

const App = () => {
  const [img, setImg] = useState([]);
  useEffect(()=>{fetch('');},[]);
  //
  return (
    <div className='container'>
      <SearchFormHTML />


    </div>
 
  );
};

export default App;
