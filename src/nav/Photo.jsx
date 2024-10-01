import React from 'react';
import UseFetch from '../fetch/UseFetch';
import PhotoWrite from './PhotoWrite';
import { Link } from 'react-router-dom';

const Photo = () => {
  const photo = UseFetch('http://localhost:3001/photo');

  return (
    <div className='photo'>
      <div className='photowrite'>
        <Link to='/photo/photoWrite'>
        <button>글쓰기</button></Link>
      </div>
      {photo.map((photo) => (
        <div key={photo.id}>
          <h3 className='phtoTop'>{photo.title}</h3>
          <div className='photoMiddle'>
            <div>안예선</div>
            <div>2024.10.01</div>
          </div>
          <div className='photoPhoto'>
            <img src={photo.image} alt='사진' /> {/* image 필드 사용 */}
          </div>

          <div className='photophotowirte'>{photo.content}</div> {/* content 필드 사용 */}

          <div className='photobottom'>
            <button>수정</button>
            <button>삭제</button>
          </div>

          <div className='photoPeople'>
            <span>댓글</span>
            <span>
              <input />
            </span>
            <span>
              <button>확인</button>
            </span>
          </div>

          <div className='photopeoplewrite'>
            <ul>
              {/* coment 배열을 map으로 순회 */}
              {photo.coment.map((comment, index) => (
                <li key={index}>
                  {Object.keys(comment).map((author) => (
                    <span key={author}>
                      {author}: {comment[author]}
                    </span>
                  ))}
                  <span>
                    <button>수정</button>
                    <button>삭제</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Photo;
