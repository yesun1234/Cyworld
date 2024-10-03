import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UseFetch from '../fetch/UseFetch';

const PhotoWrite = () => {
  const photoNav = UseFetch('http://localhost:3001/photoList');

  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const onEditorSaveHandler = () => {
    // 작성된 텍스트 내용을 갖고옴
    console.log(content);
  };
  const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'], // 이미지 버튼 추가
      ['clean']
    ]
  };

  return (
    <div className='photoWrite'>
      <div className='photowritetop'>
        <span><h3>title</h3></span>
        <span><input type="text" /></span>
        <span>
          <select name="" id="">
            {photoNav.map((nav)=>(
              <option value="">{nav.nav}</option>
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
      <div>
        <button onClick={onEditorSaveHandler}>저장!</button>
      </div>
    </div>
  );
};

export default PhotoWrite;
