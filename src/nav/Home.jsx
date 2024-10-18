import React from 'react'
import Img from '../image/miniroom.jpeg'
const Home = () => {
  return (
    <div className='home'>
      <div className='homeTop'>
        <p>최근 게시물</p>
        <ul>
          <li><span>동영상</span></li>
          <li><span>게시판</span></li>
          <li><span>스킨, 메뉴효과 예약기능</span></li>
          <li><span>더욱 편리해진 사용중 아이템</span></li>
        </ul>
        <ul>
          <li>방명록 22/225 <span>n</span></li>
          <li>사진첩 <span>n</span></li>
        </ul>
        <ul>
          <li>즐겨찾기 <span>0/3</span></li>
          <li>다이어리 <span>0/12</span></li>
        </ul>
      </div>
      <div className='homeMain'>
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
          <li>ㅎㅇ <span>(친구 <span>노제</span>) <span>2009.10.11</span> </span></li>
          <li>ㄲㅈ <span>(친구 <span>노제</span>) <span>2009.10.11</span></span></li>
          <li>ㅋㅋ <span>(친구 <span>노제</span>) <span>2009.10.11</span></span></li>
          <li>ㅊㅊ <span>(친구 <span>노제</span>) <span>2009.10.11</span></span></li>
        </ul>
      </div>
    </div>
  )
}

export default Home
