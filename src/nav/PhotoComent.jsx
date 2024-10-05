import React from 'react';

const PhotoComent = ({ comments }) => {
  // comments가 undefined 또는 null인 경우 빈 배열로 처리
  if (!comments || comments.length === 0) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>
          {Object.entries(comment).map(([author, content]) => (
            <div key={author}>
              <span>{author}: {content}</span>
              <span>
                <button>수정</button>
                <button>삭제</button>
              </span>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
};

export default PhotoComent;
