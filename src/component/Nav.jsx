import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [click, setClick] = useState(0);
  const thisClick = (index) => {
    setClick(index);
  }
  return (
    <div className='nav'>
      <ul>
        {['home', 'profile', 'board', 'guest','photo'].map((item, index) => (
          <li key={index} onClick={() => thisClick(index)} style={{backgroundColor: click === index ? '#ededed' : 'rgb(88, 120, 207)'}}>
            <Link to={`/${item}`}>
              {item === 'home' ? '홈' : item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
