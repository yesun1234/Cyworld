import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UseFetch from '../fetch/UseFetch';
import { useNavigate, useParams } from 'react-router-dom';

const PhotoWrite = () => {
  const { nav } = useParams(); // URL에서 nav 값을 가져옵니다.
  const photoNav = UseFetch('http://localhost:3001/photoList') || [];
  
  const [content, setContent] = useState('');
  const [nextNo, setNextNo] = useState(0);
  const [selectedNav, setSelectedNav] = useState(''); // 초기값을 빈 문자열로 설정
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 nav 값을 사용하여 selectedNav 업데이트
    if (nav) {
      setSelectedNav(decodeURIComponent(nav)); // URL 디코딩
    } else if (photoNav.length > 0) {
      setSelectedNav(photoNav[0]?.nav || ''); // nav가 없으면 첫 번째 nav 사용
    }
    writeNo();
  }, [photoNav, nav]);

  const writeNo = async () => {
    const response = await fetch(`http://localhost:3001/photo`);
    const data = await response.json();
    if (data.length > 0) {
      const maxNo = Math.max(...data.map(photo => parseInt(photo.id, 10)));
      setNextNo(maxNo + 1);
    } else {
      setNextNo(0);
    }
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleNavChange = (e) => {
    setSelectedNav(e.target.value); // 드롭다운에서 선택된 nav 값 업데이트
  };

  const onEditorSaveHandler = () => {
    console.log(content);
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
    const response = await fetch(`http://localhost:3001/photo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: String(nextNo),
        nav: selectedNav,
        title: title,
        content: content,
        date: new Date().toISOString()
      })
    });
    if (response.ok) {
      navigate('/photo');
      console.log('저장 완료');
    } else {
      console.error('저장 실패');
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

export default PhotoWrite;
