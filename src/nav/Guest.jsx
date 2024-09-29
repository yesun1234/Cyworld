import React, { useState, useEffect } from 'react';
import GuestTop from './GuestTop';
import GuestBottom from './GuestBottom';
import Pagination from 'react-js-pagination';

const Guest = () => {
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [guests, setGuests] = useState([]);
  const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch('http://localhost:3001/guest');
      const data = await response.json();
      const sortedGuests = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순으로 정렬
      setGuests(sortedGuests); // 전체 guests 상태 업데이트
      setTotalItemsCount(sortedGuests.length); // 총 아이템 수를 설정
    };
    fetchGuests();
  }, []);

  const handleNewGuest = (newGuest) => {
    setGuests(prevGuests => [newGuest, ...prevGuests]); // 새 글 추가
    setTotalItemsCount(prevCount => prevCount + 1); // 총 아이템 수 증가
  };

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0); // 페이지가 바뀔 때 맨 위로 스크롤
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
          activePage={page} // 현재 페이지
          itemsCountPerPage={itemsPerPage} // 한 페이지에 보여줄 아이템 개수
          totalItemsCount={totalItemsCount} // 총 아이템 개수
          pageRangeDisplayed={5} // 보여줄 페이지 범위
          prevPageText={"‹"} // "이전" 텍스트
          nextPageText={"›"} // "다음" 텍스트
          onChange={handlePageChange} // 페이지 변경 핸들러
        />
      </div>
    </div>
  );
};

export default Guest;
