import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestTop = () => {
  const history = useNavigate();
  const contentRef = useRef(null);
  const [nextNo, setNextNo] = useState(0);
  const [guests, setGuests] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const fetchGuests = async () => {
    const response = await fetch('http://localhost:3001/guest');
    const data = await response.json();
    setGuests(data);
    if (data.length > 0) {
      const maxNo = Math.max(...data.map(guest => parseInt(guest.no, 10)));
      setNextNo(maxNo + 1); 
    } else {
      setNextNo(0); 
    }
  };

  useEffect(() => {
    fetchGuests(); 
  }, []);

  const write = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/guest', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: contentRef.current.value,
        no: nextNo, 
        id: "dptjs1106", 
        name: "안예선",
        date: new Date().toISOString() 
      })
    }).then(res => {
      if (res.ok) {
        alert("글을 작성하시겠습니까?");
        // 새로 작성된 글을 guests 배열에 추가
        setGuests(prevGuests => [
          ...prevGuests,
          {
            content: contentRef.current.value,
            no: nextNo,
            id: "dptjs1106",
            name: "안예선",
            date: new Date().toISOString()
          }
        ]);
        // 입력 필드 비우기
        contentRef.current.value = '';
        // 다음 번호 업데이트
        setNextNo(nextNo + 1);
      }
    });
  };

  return (
    <div className='guesttop'>
      <form onSubmit={write}>
        <div className='profile'>
          <img src="/image/KakaoTalk_Photo_2024-09-19-18-17-35.png" alt="사이월드 로고" />
        </div>
        <div className='write'>
          <textarea ref={contentRef} placeholder="글을 작성하세요..."></textarea>
        </div>
        <button type="submit">확인</button>
      </form>
      
    </div>
  );
};

export default GuestTop;
