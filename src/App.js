import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import Aside from './component/Aside';
import Home from './nav/Home';
import Board from './nav/Board';
import Guest from './nav/Guest';
import Photo from './nav/Photo';
import Profile from './nav/Profile';
import Nav from './component/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoWrite from './nav/PhotoWrite';
import PhotoReWrite from './nav/PhotoReWrite';

const App = () => {
  const [showPhotoAlbum, setShowPhotoAlbum] = useState(false); // State for controlling photo album visibility

  useEffect(() => {
    const app = document.querySelector('.content');
  
    const handleScroll = () => {
      console.log('Scrolled!', app.scrollTop);
    };
  
    app.addEventListener('scroll', handleScroll);
  
    return () => {
      app.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <Router>
      <div className='app'>
        <div className='outline'></div>
        <div className='inline'></div>
        <div className='bgs'></div>
        <Header />
        <div className='flex'>
          <Aside showPhotoAlbum={showPhotoAlbum} /> {/* Pass showPhotoAlbum state */}
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/board" element={<Board />} />
              <Route path="/guest" element={<Guest />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/photo/:nav" element={<Photo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/photo/photoWrite" element={<PhotoWrite />} />
              <Route path='/photo/photoReWrite/:id' element={<PhotoReWrite />} />
            </Routes>
          </div>
          <Nav setShowPhotoAlbum={setShowPhotoAlbum} /> {/* Pass setShowPhotoAlbum function */}
        </div>
      </div>
    </Router>
  );
};

export default App;
