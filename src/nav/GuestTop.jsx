import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestTop = () => {
  const history = useNavigate();
  const contentRef = useRef(null);
  const [nextNo, setNextNo] = useState(0);

  const fetchGuests = async () => {
    const response = await fetch('http://localhost:3001/guest/');
    const data = await response.json();
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
    fetch('http://localhost:3001/guest/', {
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
        history(`/guest/${nextNo}`); 
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
