import React, { useRef, useState, useEffect } from 'react';

const GuestTop = ({ onNewGuest }) => {
  const contentRef = useRef(null);
  const [nextNo, setNextNo] = useState(0);

  const fetchGuests = async () => {
    const response = await fetch('http://localhost:3001/guest');
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

  const write = async (e) => {
    e.preventDefault();
    const newGuest = {
      content: contentRef.current.value,
      no: nextNo, 
      id: "dptjs1106", 
      name: "안예선",
      date: new Date().toISOString() 
    };

    const response = await fetch('http://localhost:3001/guest', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGuest)
    });

    if (response.ok) {
      alert("글이 작성되었습니다.");
      // 새로 작성된 글을 부모 컴포넌트에 전달
      onNewGuest(newGuest);
      contentRef.current.value = '';
      setNextNo(nextNo + 1);
    }
  };

  return (
    <div className='guesttop'>
      <form onSubmit={write}>
        <div className='profile'>
        <img src='/Cyworld/static/media/KakaoTalk_Photo_2024-09-19-18-17-35.fccafeb60e41252e995a.png' alt="사이월드 로고" />
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
