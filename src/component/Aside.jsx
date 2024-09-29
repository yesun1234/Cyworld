import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';

const Aside = ({ showPhotoAlbum }) => {
  const photolists = UseFetch('http://localhost:3001/photoList');
  const idRef = useRef(null);
  const navRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [showInputFields, setShowInputFields] = useState(false); // 입력 필드 표시 상태

  const handleAddPhotoList = () => {
    const newId = photolists.length ? photolists[photolists.length - 1].id + 1 : 1; // 새로운 ID 생성
    fetch('http://localhost:3001/photoList', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newId, // 새로운 ID 사용
        nav: navRef.current.value // nav는 입력 필드에서 가져옴
      })
    }).then(res => {
      if (res.ok) {
        alert("사진이 추가되었습니다.");
        idRef.current.value = '';
        navRef.current.value = '';
      } else {
        alert("추가 실패: " + res.status + " " + res.statusText);
      }
    }).catch(err => {
      console.error("추가 오류:", err);

    });
  };

  return (
    <div className='aside'>
      {!showPhotoAlbum && (
        <>
          <div className='asideTop'>
            <span>todays is..</span>
            <span>파이팅</span>
          </div>

          <div className='asidePhto'>
            <img src="/image/KakaoTalk_Photo_2024-09-19-18-17-35.png" alt="사이월드 로고" />
          </div>

          <div className='asideMain'>사이좋은 사람들 싸이월드 ^~^</div>

          <div className='asideBottom flex s-b'>
            <div>HISTORY</div>
            <div>upDown</div>
          </div>

          <div className='asideLast'>
            <div className='flex'>
              <div>싸이월드</div>
              <div>여 1999.07.07</div>
            </div>
            <div>dptjs1106@naver.com</div>
          </div>
        </>
      )}

      {/* 사진첩 부분 */}
      {showPhotoAlbum && (
        <div className='photoside'>
          <h4>PHTO ALBUM</h4>
          <ul>
            {photolists.map((list) => (
              <li key={list.id}><Link to='/photo'>{list.nav}</Link></li>
            ))}
          </ul>
          {isEditing ? (
            <>
              <button onClick={() => setShowInputFields(true)}>+</button>
              <button onClick={() => setIsEditing(false)}>-</button>
              {showInputFields && (
                <div>
                  <input type="text" ref={navRef} placeholder="사진 이름" />
                  <button onClick={handleAddPhotoList}>추가</button>
                </div>
              )}
            </>
          ) : (
            <div className='phtoasidebutton'>
              <button onClick={() => setIsEditing(true)}>수정</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Aside;
