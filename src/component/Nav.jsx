import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';

const Nav = ({ setShowPhotoAlbum }) => { 
  const [selectedIndex, setSelectedIndex] = useState(null); // 초기값을 null로 설정
  const click = UseFetch('http://localhost:3001/nav');

  useEffect(() => {
    // 페이지 새로고침 시 localStorage에서 저장된 index를 가져옴
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
    localStorage.setItem('selectedIndex', index); // 클릭 시 index를 localStorage에 저장
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
                backgroundColor: isSelected ? '#fff' : 'rgb(56 142 176)',
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
