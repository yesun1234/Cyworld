import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../image/logo.svg'

const Main = () => {
  return (
    <div className='homemain'>
      <div className='homemaincontainer'>
        <div className='homemainlogo'>
            <span><img src={Img} /></span>
            <span>cyworld</span>
            <span>beta</span>
        </div>
        <div className='homemaininput'>
            <input type="text" placeholder='아이디'/>
            <input type="text" placeholder='비밀번호'/>
        </div>
        <button>
            로그인
        </button>
        <div className='homemainbottom'>
            <span>
                <Link to="/find">아이디/비밀번호 찾기 | </Link>
            </span>
            <span>
                <Link to="/join">회원가입</Link>
            </span>
        </div>
      </div>
    </div>
  )
}

export default Main
