import React, { useState } from 'react'
import Img from '../image/miniroom.jpeg'
import { Link } from 'react-router-dom'
import { PiArrowElbowDownRightBold } from "react-icons/pi";
const Home = () => {
  const [inputVisible, setInputVisble] = useState(false)
  const handleCommentClick = () => {
    setInputVisble(!inputVisible);
  }
  return (
    <div className='home'>
      <div className='homeTop'>
        <p>최근 게시물</p>
        <ul>
          <Link to=''><li><span>동영상</span><span>맘에 드는 아이템을 소망상...</span></li></Link>
          <Link to=''><li><span>게시판</span><span>내 개성은 미니미로</span></li></Link>
          <Link to=''><li><span>갤러리</span><span>스킨, 메뉴효과 예약기능</span></li></Link>
          <Link to=''><li><span>사진첩</span><span>더욱 편리해진 사용중 아이템</span></li></Link>
        </ul>
        <ul>
          <Link to=''><li>방명록 <span>0/3</span><span>n</span></li></Link>
          <Link to=''><li>사진첩 <span>0/3</span><span>n</span></li></Link>
          <li></li>
          <li></li>
        </ul>
        <ul>
          <Link to=''><li>즐겨찾기 <span>0/3</span><span>n</span></li></Link>
          <Link to=''><li>다이어리 <span>0/12</span><span>n</span></li></Link>
        <li></li>
        <li></li>
        </ul>
      </div>
      <div className='homeMain'>
        <p>싸이월드</p>
        <img src={Img} alt="미니룸" />
      </div>
      <div className='homeBottom'>
        <p>일촌평</p>
        <div className='homeBottomTop'>
          <span>friends say</span>
          <span><input type="text" placeholder='일촌과 나누고 싶은 이야기를 남겨보세요~!'/></span>
          <span><button>확인</button></span>
        </div>
        <ul>
          <li>
            <span>ㅎㅇ</span> <span>(친구 <span className='friendId'>노제</span>) <span className='friendDate'>2009.10.11</span> </span> <button className='friendComment' onClick={handleCommentClick}><PiArrowElbowDownRightBold /></button>
            {inputVisible && (
                <div>
                  <input type="text" placeholder='댓글을 남겨보세요' />
                  <button>확인</button>
                </div>
              )}
          </li>
          <li>
            <span>ㅎㅇ</span> <span>(친구 <span className='friendId'>노제</span>) <span className='friendDate'>2009.10.11</span></span>  <button className='friendComment' onClick={handleCommentClick}><PiArrowElbowDownRightBold /></button>
            {inputVisible && (
                <div>
                  <input type="text" placeholder='댓글을 남겨보세요' />
                  <button>확인</button>
                </div>
              )}
          </li>
          <li>
            <span>ㅎㅇ</span> <span>(친구 <span className='friendId'>노제</span>) <span className='friendDate'>2009.10.11</span></span> <button className='friendComment' onClick={handleCommentClick}><PiArrowElbowDownRightBold /></button>
            {inputVisible && (
                <div>
                  <input type="text" placeholder='댓글을 남겨보세요' />
                  <button>확인</button>
                </div>
              )}
          </li>
          <li>
            <span>ㅎㅇ</span> <span>(친구 <span className='friendId'>노제</span>) <span className='friendDate'>2009.10.11</span></span> <button className='friendComment' onClick={handleCommentClick}><PiArrowElbowDownRightBold /></button>
            {inputVisible && (
                <div>
                  <input type="text" placeholder='댓글을 남겨보세요' />
                  <button>확인</button>
                </div>
              )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
