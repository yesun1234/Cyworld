import React from 'react'
import Img from '../image/girl_599666.png'
import Img2 from '../image/B.png'
import Img3 from '../image/laugh_12281373.png'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
const RightSide = () => {
  return (
    <div className='rightside'>
      <div className='righttop'>
        <p>마이심볼</p>
        <div>
            <span><img src={Img} /></span>
            <span><img src={Img2} /></span>
            <span><img src={Img3} /></span>
        </div>
      </div>
      <div className='rightmiddle'>
        <ul>
            <li>
                <span>액티브</span>
                <span></span>
                <span><button><FaMinus className='minusLogo'/></button></span>
            </li>
            <li>
                <span>페이머스</span>
                <span></span>
                <span><button><FaMinus className='minusLogo'/></button></span>
            </li>
            <li>
                <span>프랜들리</span>
                <span></span>
                <span><button><FaPlus className='plusLogo'/></button></span>
            </li>
        </ul>
    </div>
    <div className='rightbottom'>
        <ul>
            <li>
                <span>스크랩 게시물</span>
                <span className='s-f'>1234</span>
                <span>n</span>
            </li>
            <li><span>즐겨찾기</span><span className='s-f'>1</span></li>
            <li><span>사용중인아이템</span><FaPlus /><span>소망상자</span></li>
        </ul>
    </div>
    <div className='rightsound'>
        <div></div>
        <div>sg워너비 - 라라라</div>
    </div>
    <div className='rightmusic'>
        <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div>
            <span></span>
            <span></span>
            <span>LIST</span>
        </div>
    </div>
    </div>
  )
}

export default RightSide
