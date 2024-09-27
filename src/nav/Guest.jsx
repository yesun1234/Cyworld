import React from 'react';
import UseFetch from '../fetch/UseFetch';
import GuestTop from './GuestTop';

const Guest = () => {
  const content = UseFetch('http://localhost:3001/guest');

  return (
    <div>
      <GuestTop />
      <ul>
        {content.map((guest, index) => (
          <li key={guest.id}>
            {guest.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guest;
