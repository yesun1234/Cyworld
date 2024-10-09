import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UseFetch from '../fetch/UseFetch';
import { useNavigate, useParams } from 'react-router-dom';

const PhotoReWrite = () => {
  const photoNav = UseFetch('http://localhost:3001/photoList') || [];
  const { id } = useParams(); // useParams에서 id 가져오기
  const [content, setContent] = useState('');
  const [selectedNav, setSelectedNav] = useState(''); 
  const [title, setTitle] = useState('');
  const [coment, setComent] = useState([]); // 댓글 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 해당 id의 데이터를 가져와서 상태에 저장
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/photo/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setSelectedNav(data.nav || (photoNav[0]?.nav || '')); // 네비게이션 설정
      setComent(data.coment || []); // 기존 댓글 데이터를 상태에 저장
    };
    
    fetchData();
  }, [id, photoNav]);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleNavChange = (e) => {
    setSelectedNav(e.target.value);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'], // 이미지 버튼 추가
      ['clean']
    ]
  };

  const write = async () => {
    const response = await fetch(`http://localhost:3001/photo/${id}`, {
      method: "PUT", // 수정 요청은 PUT 메서드 사용
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id, // 기존 id 그대로 사용
        nav: selectedNav,
        title: title,
        content: content,
        date: new Date().toISOString(),
        coment: coment // 댓글도 함께 전송
      })
    });
    if (response.ok) {
      navigate(-1);
      console.log('수정 완료');
    } else {
      console.error('수정 실패');
    }
  };

  return (
    <div className='photoWrite'>
      <div className='photowritetop'>
        <span><h3>제목</h3></span>
        <span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </span>
        <span>
          <select value={selectedNav} onChange={handleNavChange}>
            {photoNav.map((nav) => (
              <option key={nav.id} value={nav.nav}>{nav.nav}</option>
            ))}
          </select>
        </span>
      </div>
      <div style={{ width: "100%" }}>
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={modules}
          placeholder="아무말이나 작성해주세요!"
        />
      </div>
      <div className='writebtn'>
        <button onClick={write}>저장!</button>
      </div>
    </div>
  );
};

export default PhotoReWrite;
