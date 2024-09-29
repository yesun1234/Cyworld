import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';

const Nav = ({ setShowPhotoAlbum }) => { 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const click = UseFetch('http://localhost:3001/nav');

  const handleClick = (index, navId) => {
    setSelectedIndex(index);
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
            <li
              key={nav.id}
              onClick={() => handleClick(index, nav.id)} 
              style={{
                backgroundColor: isSelected ? '#fff' : 'rgb(88, 120, 207)',
                color: isSelected ? '#666' : '#fff'
              }}>
              <Link 
                to={`/${nav.id}`} 
                style={{ color: isSelected ? '#666' : '#fff' }}>
                {nav.nav}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
