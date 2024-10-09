import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dummy from '../db/Data.json'; // Data.json 파일 불러오기

const Nav = ({ setShowPhotoAlbum }) => { 
  const [selectedIndex, setSelectedIndex] = useState(null);
  const click = dummy.nav; // Data.json의 nav 배열 사용

  useEffect(() => {
    const savedIndex = localStorage.getItem('selectedIndex');
    if (savedIndex !== null) {
      setSelectedIndex(parseInt(savedIndex, 10));
      const savedNavId = click[parseInt(savedIndex, 10)]?.id;
      if (savedNavId === 'photo') {
        setShowPhotoAlbum(true);
      } else {
        setShowPhotoAlbum(false);
      }
    }
  }, [click, setShowPhotoAlbum]);

  const handleClick = (index, navId) => {
    setSelectedIndex(index);
    localStorage.setItem('selectedIndex', index);
    if (navId === 'photo') {
      setShowPhotoAlbum(true);
    } else {
      setShowPhotoAlbum(false); 
    }
  };

  return (
    <div className='nav'>
      <ul>
        {click.map((nav, index) => {
          const isSelected = index === selectedIndex;
          return (
           <Link 
                to={`/${nav.id}`} 
                style={{ color: isSelected ? '#666' : '#fff' }}>
                 <li
              key={nav.id}
              onClick={() => handleClick(index, nav.id)} 
              style={{
                backgroundColor: isSelected ? '#fff' : 'rgb(56 142 176)',
                color: isSelected ? '#666' : '#fff'
              }}>
              {nav.nav}
             
            </li> </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
