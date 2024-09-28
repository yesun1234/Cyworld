import React, { useEffect, useState } from 'react';
import UseFetch from '../fetch/UseFetch';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const GuestBottom = ({ currentPage, itemsPerPage }) => {
  const [guests, setGuests] = useState([]); // 상태 관리
  const content = UseFetch('http://localhost:3001/guest');

  useEffect(() => {
    // 초기 데이터를 설정합니다.
    setGuests(content);
  }, [content]);

  // 데이터를 역순으로 정렬하여 최신순으로 표시
  const sortedContent = [...guests].reverse();

  const indexOfLastGuest = currentPage * itemsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - itemsPerPage;
  const currentGuests = sortedContent.slice(indexOfFirstGuest, indexOfLastGuest);

  const remove = (id, event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    fetch(`http://localhost:3001/guest/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      console.log(res); // 응답 로그 확인
      if (res.ok) {
        setGuests((prevGuests) => prevGuests.filter(guest => guest.id !== id));
        alert("삭제되었습니다.");
      } else {
        alert("삭제 실패: " + res.status + " " + res.statusText);
      }
    }).catch(err => {
      console.error("삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    });
    
  };

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
              <span className='del'>
                <button onClick={(event) => remove(guest.id, event)}>삭제</button>
              </span>
              <span className='change'>
                <button>수정</button>
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
