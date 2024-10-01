import React from 'react'

const Photo = () => {
  return (
    <div className='photo'>
      <div className='photowrite'>
        <button>글쓰기</button>
      </div>

      <h3 className='phtoTop'>행복한 하루</h3>

      <div className='photoMiddle'>
        <div>안예선</div>
        <div>2024.10.01</div>
      </div>

      <div className='photoPhoto'>
          <img src='/image/IMG_4420.PNG' alt='거울샷' />
      </div>

      <div className='photophotowirte'>행복한 하루야~~</div>

      <div className='photobottom'>
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div className='photoPeople'>
        <span>댓글</span>
        <span><input></input></span>
        <span><button>확인</button></span>
      </div>
      <div className='photopeoplewrite'>
        <ul>
          <li><span>안예선: 예뻐요</span> <span><button>수정</button><button>삭제</button></span></li>
          <li><span>김해원: 예뻐다 기지배</span> <span><button>수정</button><button>삭제</button></span></li>
          <li><span>전혜지: 놀러가자</span> <span><button>수정</button><button>삭제</button></span></li>
        </ul>
      </div>
    </div>
  )
}

export default Photo
