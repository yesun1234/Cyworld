import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Start with the first item selected
  const click = UseFetch('http://localhost:3001/nav');

  // Handle item click to update selected index
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className='nav'>
      <ul>
        {click.map((nav, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={nav.id}
              onClick={() => handleClick(index)}
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
