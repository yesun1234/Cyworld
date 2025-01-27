import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Img from '../image/logo.svg'

const Main = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!userid || !password){
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }
    try{
      const response = await fetch(`http://localhost:3001/member?username=${userid}&password=${password}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('서버 응답에 문제가 있습니다.');
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        throw new Error('아이디 또는 비밀번호가 틀렸습니다.');
      }
  
      alert('로그인 성공!');
      localStorage.setItem('user', JSON.stringify(data[0])); // 사용자 정보를 저장 (예: 토큰 대신 전체 데이터)
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className='homemain'>
      <div className='homemaincontainer'>
        <div className='homemainlogo'>
            <span><img src={Img} /></span>
            <span>cyworld</span>
            <span>beta</span>
        </div>
        <div className='homemaininput'>
            <input type="text" placeholder='아이디' value={userid} onChange={(e) => setUserid(e.target.value)}/>
            <input type="text" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button onClick={handleLogin}>
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
