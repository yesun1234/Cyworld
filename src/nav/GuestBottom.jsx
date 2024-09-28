import React from 'react';
import UseFetch from '../fetch/UseFetch';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; // 사용할 아이콘

const GuestBottom = () => {
  const content = UseFetch('http://localhost:3001/guest');
 
  return (
    <>
      {content.map((guest, index) => (
        <div className='guestbottom' key={`${guest.id}-${index}`}> {/* 고유한 key 생성 */}
          <div className='guest-item'>
            <div className='profiletop'>
              <span>no.{guest.no}</span>
              <span>{guest.name}</span>
              <span>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </span>
              <span>
                ({guest.date})
              </span>
            </div>
            <div className='profilebottom'>
              <div className='profile'>
                <img src="/image/KakaoTalk_Photo_2024-09-19-18-17-35.png" alt="사이월드 로고" />
              </div>
              <div className='write'>
                {guest.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GuestBottom;

