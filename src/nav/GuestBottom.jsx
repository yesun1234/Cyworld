import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const GuestBottom = ({ currentGuests, setGuests }) => {
  const [editingGuest, setEditingGuest] = useState(null); // 수정 중인 손님
  const [editContent, setEditContent] = useState(''); // 수정 내용

  const remove = (id, event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    fetch(`http://localhost:3001/guest/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.ok) {
        alert("삭제되었습니다.");
        // 삭제 후 상태 업데이트
        setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id)); // 화면에서 삭제
      } else {
        alert("삭제 실패: " + res.status + " " + res.statusText);
      }
    }).catch(err => {
      console.error("삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    });
  };

  const handleEditClick = (guest) => {
    setEditingGuest(guest); // 수정할 손님 설정
    setEditContent(guest.content); // 수정할 내용 불러오기
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value); // textarea 내용 변경
  };

  const handleEditSubmit = (id) => {
    fetch(`http://localhost:3001/guest/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingGuest, content: editContent }) // 수정된 내용 전송
    }).then((res) => {
      if (res.ok) {
        alert("수정되었습니다.");
        setGuests(prevGuests => 
          prevGuests.map(guest => 
            guest.id === id ? { ...guest, content: editContent } : guest
          )
        );
        setEditingGuest(null); // 수정 모드 종료
      } else {
        alert("수정 실패: " + res.status + " " + res.statusText);
      }
    }).catch(err => {
      console.error("수정 오류:", err);
      alert("수정 중 오류가 발생했습니다.");
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
                <span>({formatDate(guest.date)})</span>
                <span className='del'>
                  <button onClick={(event) => remove(guest.id, event)}>삭제</button>
                </span>
                <span className='change'>
                  <button onClick={() => handleEditClick(guest)}>수정</button>
                </span>
              </div>
              <div className='profilebottom'>
                <div className='profile'>
                  <img src='/Cyworld/static/media/KakaoTalk_Photo_2024-09-19-18-17-35.fccafeb60e41252e995a.png' alt="사이월드 로고" />
                </div>
                <div className='write'>
                  <p>
                  {editingGuest && editingGuest.id === guest.id ? (
                    <div>
                      <textarea 
                        value={editContent} 
                        onChange={handleEditChange} 
                        rows={4}
                      />
                      <button onClick={() => handleEditSubmit(guest.id)}>수정 완료</button>
                    </div>
                  ) : (
                    guest.content
                  )}
                  </p>
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
