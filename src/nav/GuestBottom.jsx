import React from 'react';
import UseFetch from '../fetch/UseFetch';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const GuestBottom = ({ currentPage, itemsPerPage }) => {
  const content = UseFetch('http://localhost:3001/guest');

  const indexOfLastGuest = currentPage * itemsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - itemsPerPage;
  const currentGuests = content.slice(indexOfFirstGuest, indexOfLastGuest);

  return (
    <>
      {currentGuests.map((guest, index) => (
        <div className='guestbottom' key={`${guest.id}-${index}`}>
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
