import React from 'react';
import GuestTop from './GuestTop';
import GuestBottom from './GuestBottom';

const Guest = () => {
  return (
    <div className='guest'>
      <GuestTop />
      <div className='scroll-content'>
        <GuestBottom />
      </div>
    </div>
  );
};

export default Guest;
