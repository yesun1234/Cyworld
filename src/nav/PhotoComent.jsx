import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoComent = ({ id, date, comments, selectedNav, title, content }) => {
  const [coment, setComent] = useState(comments || []); // 기존 댓글 또는 빈 배열
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 입력 상태
  const [editingIndex, setEditingIndex] = useState(null); // 현재 수정 중인 댓글 인덱스
  const [editedComment, setEditedComment] = useState(''); // 수정할 댓글 내용
  const navigate = useNavigate();

 // 새로운 댓글 추가 함수
const handleAddComment = () => {
  // 기존 댓글 ID 중 가장 큰 값을 찾고, 그 다음 숫자를 새로운 ID로 설정
  const maxId = coment.reduce((max, comment) => Math.max(max, parseInt(comment.id)), 0);
  const newId = maxId + 1;

  const updatedComments = [
    ...coment,
    {
      id: newId.toString(), // 새로운 댓글 ID는 문자열로 변환
      name: '새로운 사용자',
      coment: newComment,
      date: new Date().toISOString(),
      rewrite: false, // 새로운 댓글은 rewrite가 false
    },
  ];
  setComent(updatedComments);
  setNewComment(''); // 입력 필드를 초기화
  updatePhotoComments(updatedComments); // 서버에 업데이트 요청
};


  // 댓글 수정 시작
  const handleEditClick = (index, comment) => {
    setEditingIndex(index);
    setEditedComment(comment.coment); // 수정할 댓글 내용 설정
  };

  // 댓글 수정 저장
  const handleSaveEdit = (index) => {
    const updatedComments = [...coment];
    updatedComments[index].coment = editedComment; // 수정된 댓글로 업데이트
    updatedComments[index].date = new Date().toISOString(); // 수정한 시간으로 날짜 업데이트
    updatedComments[index].rewrite = true; // 수정된 댓글은 rewrite가 true로 설정
    setComent(updatedComments);
    setEditingIndex(null); // 수정 모드 종료
    updatePhotoComments(updatedComments); // 서버에 업데이트 요청
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
          id, // photo id 포함
          nav: selectedNav, // 네비게이션 선택값도 포함
          title, // title 값도 포함
          content, // 본문 내용 포함
          date, // 기존 날짜 유지
          coment: updatedComments, // 수정된 댓글 리스트
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

  /* DELETE */
  // 댓글 삭제 함수
const remove = async (commentId) => {
  try {
    const response = await fetch(`http://localhost:3001/photo/${commentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setComent(prevComments => prevComments.filter(comment => comment.id !== commentId));
      console.log("댓글 삭제 완료");
    } else {
      console.error("댓글 삭제 실패:", response.statusText);
    }
  } catch (error) {
    console.error("서버 요청 실패:", error);
  }
};

  return (
    <div>
      <ul>
        {coment.map((comment, index) => (
          <li key={index}>
            <div>
              <span>{comment.name}: {comment.coment}</span>
              {/* 댓글 날짜 표시 */}
              <span style={{ marginLeft: '10px', fontSize: '12px', color: 'gray' }}>
                {new Date(comment.date).toLocaleString()} {/* 날짜 포맷팅 */}
                {comment.rewrite && (
                  <span style={{ marginLeft: '5px', color: 'blue' }}>수정됨</span> // 수정됨 표시
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
                  <button onClick={() => remove(comment.id)}>삭제</button> {/* comment.id 사용 */}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 새로운 댓글 입력 */}
      <div className='photoPeople'>
        <input
          type='text'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='댓글 입력'
        />
        <button onClick={handleAddComment}>확인</button>
      </div>
    </div>
  );
};

export default PhotoComent;
