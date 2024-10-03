import React from 'react';
import UseFetch from '../fetch/UseFetch';
import { Link } from 'react-router-dom';

const Photo = () => {
  const photo = UseFetch('http://localhost:3001/photo');

  return (
    <div className='photo'>
      <div className='photowrite'>
        <Link to='/photo/photoWrite'>
          <button>글쓰기</button>
        </Link>
      </div>
      {photo.map((photoItem) => (
        <div key={photoItem.id}>
          <h3 className='photoTop'>{photoItem.title}</h3>
          <div className='photoMiddle'>
            <div>안예선</div>
            <div>{photoItem.date}</div>
          </div>
          <div className='photoPhoto'>
          <img src={photoItem.image} alt="사진" />
          </div>

          <div className='photophotowirte'>
            {console.log('Content:', photoItem.content)} {/* 로그 확인 */}
            <div dangerouslySetInnerHTML={{ __html: photoItem.content }} /> {/* HTML을 안전하게 출력 */}
          </div>

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
              {photoItem.coment && photoItem.coment.map((comment, index) => (
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
