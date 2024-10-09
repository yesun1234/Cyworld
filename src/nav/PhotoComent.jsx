import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummy from '../db/Data.json';

const PhotoComent = ({ id, date, comments, selectedNav, title, content }) => {
  const [coment, setComent] = useState(comments || []);
  const [newComment, setNewComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  // 새로운 댓글 추가 함수
  const handleAddComment = () => {
    const maxId = coment.reduce((max, comment) => Math.max(max, parseInt(comment.id)), 0);
    const newId = maxId + 1;

    const updatedComments = [
      ...coment,
      {
        id: newId.toString(),
        name: '새로운 사용자',
        coment: newComment,
        date: new Date().toISOString(),
        rewrite: false,
      },
    ];
    setComent(updatedComments);
    setNewComment('');
    updatePhotoComments(updatedComments);
  };

  // 댓글 수정 시작
  const handleEditClick = (index, comment) => {
    setEditingIndex(index);
    setEditedComment(comment.coment);
  };

  // 댓글 수정 저장
  const handleSaveEdit = (index) => {
    const updatedComments = [...coment];
    updatedComments[index].coment = editedComment;
    updatedComments[index].date = new Date().toISOString();
    updatedComments[index].rewrite = true;
    setComent(updatedComments);
    setEditingIndex(null);
    updatePhotoComments(updatedComments);
  };

  // 서버에 댓글 업데이트 요청
  const updatePhotoComments = async (updatedComments) => {
    try {
      const response = await fetch(`http://localhost:3001/photo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          nav: selectedNav,
          title,
          content,
          date,
          coment: updatedComments,
        }),
      });

      if (response.ok) {
        console.log('댓글 수정 완료');
      } else {
        console.error('댓글 수정 실패:', response.statusText);
      }
    } catch (error) {
      console.error('서버 요청 실패:', error);
    }
  };

  const remove = async (commentId) => {
  console.log('삭제 요청할 댓글 ID:', commentId); // 추가
  try {
    const response = await fetch(`http://localhost:3001/photo/${id}/coment/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setComent(prevComments => prevComments.filter(comment => comment.id !== commentId));
      console.log('댓글 삭제 완료');
    } else {
      console.error('댓글 삭제 실패:', response.statusText);
    }
  } catch (error) {
    console.error('서버 요청 실패:', error);
  }
};


  return (
    <div>
      <div className='photoPeople'>
        <span>댓글</span>
        <span>
          <input
            type='text'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='댓글 입력'
          />
        </span>
        <span>
          <button onClick={handleAddComment}>확인</button>
          </span>
      </div>
      <ul>
        {coment.map((comment, index) => (
          <li key={index}>
            <div>
              <span>{comment.name}: {comment.coment}</span>
              <span style={{ marginLeft: '10px', fontSize: '12px', color: 'gray' }}>
                {new Date(comment.date).toLocaleString()}
                {comment.rewrite && (
                  <span style={{ marginLeft: '5px', color: 'blue' }}>수정됨</span>
                )}
              </span>
              {editingIndex === index ? (
                <div>
                  <input
                    type='text'
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(index)}>저장</button>
                </div>
              ) : (
                <span>
                  <button onClick={() => handleEditClick(index, comment)}>수정</button>
                  <button onClick={() => remove(comment.id)}>삭제</button>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default PhotoComent;
