import React from 'react';
import Header from './component/Header';
import Aside from './component/Aside';
import Home from './nav/Home';
import Board from './nav/Board';
import Guest from './nav/Guest';
import Photo from './nav/Photo';
import Profile from './nav/Profile';
import Nav from './component/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <div className='outline'></div>
        <div className='inline'></div>
        <div className='bgs'></div>
        <Header />
        <div className='flex'>
          <Aside />
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/board" element={<Board />} />
              <Route path="/guest" element={<Guest />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Nav />
        </div>
      </div>
    </Router>
  );
};

export default App;
