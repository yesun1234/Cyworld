import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dummy from '../db/Data.json'; // 더미 데이터를 가져옵니다.
import Pagination from 'react-js-pagination';

const Photo = () => {
  // const photo = UseFetch('http://localhost:3001/photo'); // 실제 API를 사용하려면 주석을 해제하세요.
  const photos = dummy.photo; // dummy 데이터를 사용

  // 날짜를 'YYYY.MM.DD HH:mm' 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  /* page */
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [guests, setGuests] = useState([]); // guests를 저장할 상태
  const itemsPerPage = 5;

  useEffect(() => {
    // 더미 데이터를 정렬하여 guests 상태를 업데이트합니다.
    const sortedGuests = photos.sort((a, b) => new Date(b.date) - new Date(a.date));
    setGuests(sortedGuests); // 전체 guests 상태 업데이트
    setTotalItemsCount(sortedGuests.length); // 총 아이템 수를 설정
  }, [photos]);

  const handleNewGuest = (newGuest) => {
    setGuests(prevGuests => [newGuest, ...prevGuests]); // 새로운 손님을 추가합니다.
    setTotalItemsCount(prevCount => prevCount + 1); // 총 아이템 수를 증가시킵니다.
  };

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  const indexOfLastGuest = page * itemsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - itemsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest); // 현재 페이지의 손님을 가져옵니다.

  return (
    <div className='photo'>
      <div className='scroll-content'>
        <div className='photowrite'>
          <Link to='/photo/photoWrite'>
            <button>글쓰기</button>
          </Link>
        </div>
        {currentGuests.map((photoItem) => ( // currentGuests를 사용하여 데이터 출력
          <div key={photoItem.id}>
            <h3 className='photoTop'>{photoItem.title}</h3>
            <div className='photoMiddle'>
              <div>안예선</div>
              <div>{formatDate(photoItem.date)}</div>
            </div>

            <div className='photophotowirte'>
              <div dangerouslySetInnerHTML={{ __html: photoItem.content }} />
            </div>

            <div className='photobottom'>
              
              <button>수정</button>
              <button>삭제</button>
            </div>

            <div className='photoPeople'>
              <span>댓글</span>
              <span>
                <input />
              </span>
              <span>
                <button>확인</button>
              </span>
            </div>

            <div className='photopeoplewrite'>
              <ul>
                {photoItem.coment && photoItem.coment.map((comment, index) => (
                  <li key={index}>
                    {Object.keys(comment).map((author) => (
                      <span key={author}>
                        {author}: {comment[author]}
                      </span>
                    ))}
                    <span>
                      <button>수정</button>
                      <button>삭제</button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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

export default Photo;
