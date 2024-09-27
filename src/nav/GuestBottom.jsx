import React from 'react';
import UseFetch from '../fetch/UseFetch';

const GuestBottom = () => {
  const content = UseFetch('http://localhost:3001/guest');

  return (
    <>
      {content.map((guest) => (
        <div className='guestbottom'>
        <div className='guest-item' key={guest.id}>
          <div className='profile'>
            <img src="/image/KakaoTalk_Photo_2024-09-19-18-17-35.png" alt="사이월드 로고" />
          </div>
          <div className='write'>
            {guest.content}
          </div>
        </div>
        </div>
      ))}
    </>
  );
};

export default GuestBottom;
