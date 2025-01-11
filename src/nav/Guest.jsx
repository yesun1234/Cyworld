import React, { useState, useEffect } from 'react';
import GuestTop from './GuestTop';
import GuestBottom from './GuestBottom';
import Pagination from 'react-js-pagination';

const Guest = () => {
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [guests, setGuests] = useState([]);
  const itemsPerPage = 5; 

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch('http://localhost:3001/guest');
      const data = await response.json();
      const sortedGuests = data.sort((a, b) => new Date(b.date) - new Date(a.date)); 
      setGuests(sortedGuests);
      setTotalItemsCount(sortedGuests.length); 
    };
    fetchGuests();
  }, []);

  const handleNewGuest = (newGuest) => {
    setGuests(prevGuests => [newGuest, ...prevGuests]); 
    setTotalItemsCount(prevCount => prevCount + 1); 
  };

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0); 
  };

  const indexOfLastGuest = page * itemsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - itemsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);

  return (
    <div className='guest'>
      <GuestTop onNewGuest={handleNewGuest} />
      <div className='scroll-content'>
        <GuestBottom currentGuests={currentGuests} setGuests={setGuests} />
      </div>
      <div className='page'>
        <Pagination
          activePage={page} 
          itemsCountPerPage={itemsPerPage} 
          totalItemsCount={totalItemsCount} 
          pageRangeDisplayed={5} 
          prevPageText={"‹"} 
          nextPageText={"›"} 
          onChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default Guest;
