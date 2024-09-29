import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const GuestBottom = ({ currentGuests, setGuests }) => {
  const remove = (id, event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    fetch(`http://localhost:3001/guest/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.ok) {
        alert("삭제되었습니다.");
        // 삭제된 후 상태 업데이트 (삭제된 글을 guests 배열에서 필터링)
        setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id)); // id를 사용하여 삭제
      } else {
        alert("삭제 실패: " + res.status + " " + res.statusText);
      }
    }).catch(err => {
      console.error("삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    });
  };

  return (
    <div>
      {currentGuests.length === 0 ? (
        <p>등록된 글이 없습니다.</p>
      ) : (
        currentGuests.map((guest, index) => (
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
                <span>({guest.date})</span>
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
        ))
      )}
    </div>
  );
};

export default GuestBottom;
