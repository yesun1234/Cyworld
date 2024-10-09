import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dummy from '../db/Data.json';
import Pagination from 'react-js-pagination';
import PhotoComent from './PhotoComent';

const Photo = () => {
  const { nav } = useParams(); // URL에서 nav 값을 가져옴
  const photos = dummy.photo;

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
  const [guests, setGuests] = useState([]); 
  const itemsPerPage = 5;

  useEffect(() => {
    // nav 값에 맞는 사진들만 필터링하거나 첫 화면에서는 모든 사진 보여주기
    const filteredPhotos = nav === '전체보기' || !nav 
      ? photos 
      : photos.filter(photo => photo.nav === nav);

    const sortedGuests = filteredPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
    setGuests(sortedGuests);
    setTotalItemsCount(sortedGuests.length);
  }, [photos, nav]);

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  const indexOfLastGuest = page * itemsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - itemsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);

  /* DELETE */
  const remove = (id, event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/photo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          alert("삭제되었습니다.");
          setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
        } else {
          alert("삭제 실패: " + res.status + " " + res.statusText);
        }
      })
      .catch((err) => {
        console.error("삭제 오류:", err);
        alert("삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className='photo'>
      <div className='scroll-content'>
        <div className='photowrite'>
          <Link to={`/photo/photoWrite?nav=${nav}`}>
            <button>글쓰기</button>
          </Link>
        </div>
        {currentGuests.map((photoItem) => (
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
              <Link to={`/photo/photoReWrite/${photoItem.id}`}>
                <button>수정</button>
              </Link>
              <button onClick={(event) => remove(photoItem.id, event)}>삭제</button>
            </div>

            <div className='photopeoplewrite'>
              <PhotoComent 
                id={photoItem.id}
                comments={photoItem.coment} 
                selectedNav={photoItem.nav} 
                title={photoItem.title} 
                content={photoItem.content} 
                date={photoItem.date}
              />
            </div>
          </div>
        ))}
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

export default Photo;
