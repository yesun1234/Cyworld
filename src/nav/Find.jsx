import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../image/logo.svg'

const Find = () => {
    const [find, setFind] = useState(1);
    const [nextFind, setNextFind] = useState(false);
    const [orFind, setOrFind] = useState(false);

    const emailfind = () => {
        setOrFind(true);
    }
    const phonefind = () => {
        setOrFind(false);
    }

    const passwordFind = () => {
        setFind(2)
        setNextFind(true);
    }
    const idFind = () => {
        setFind(1);
        setNextFind(false)
    }


  return (
    <div className='find'>
        <div className='joinLogo'>
            <span>
                <Link to='/'>
                    <img src={Img} alt="logo" />
                </Link>
            </span>
            <span>
                <Link to='/find' onClick={() => window.location.reload()}>
                    아이디 | 비밀번호 찾기
                </Link>
            </span>
        </div>
        <div className='joinTop'>
            <button onClick={idFind} style={{background: find === 1 ? "#ff4949" : ''}}>아이디 찾기</button>
            <button onClick={passwordFind} style={{background: find === 2 ? '#ff4949' : ''}}>비밀번호 찾기</button>
        </div>
        <span className='joinStart'>아이디 / 비밀번호 찾기</span>
        {!nextFind && (
            <>
            <div className='findtop'>
                <div className='findtop-top'>아이디 찾기</div>
                <div className='finttio-bottom'>
                    <span>이메일로 찾기 <input type="radio" onClick={emailfind} checked={orFind}/></span>
                    <span>휴대폰으로 찾기 <input type="radio" onClick={phonefind} checked={!orFind}/></span>
                </div>
                {orFind && (
                    <div className='findmain'>
                    <div>
                        <span>이름</span>
                        <span className='longinput'><input type="text" /></span>
                    </div>
                    <div>
                        <span>이메일</span>
                        <span>
                            <input type="text" />
                            <span>@</span>
                            <span>
                                <select name="email">
                                    <option value="naver">naver.com</option>
                                    <option value="daum">daum.net</option>
                                    <option value="nate">nate.com</option>
                                </select>
                            </span>
                        </span>
                    </div>
                    <div className='findmainbtn'>
                        <button>아이디 찾기</button>
                    </div>
                    </div>
                )}
                {!orFind && (
                    <div className='findmain'>
                    <div>
                        <span>이름</span>
                        <span className='longinput'><input type="text" /></span>
                    </div>
                    <div>
                        <span>휴대폰</span>
                        <span className='longinput'>
                            <input type="number" placeholder='-제외'/>
                        </span>
                    </div>
                    <div className='findmainbtn'>
                        <button>아이디 찾기</button>
                    </div>
                </div>
                )}
                
            </div>
            </>
        )}
        
        {nextFind && (
            <>
            <div className='findtop'>
                <div className='findtop-top'>비밀번호 찾기</div>
                <div className='finttio-bottom'>
                    <span>이메일로 찾기 <input type="radio" onClick={emailfind} checked={orFind}/></span>
                    <span>휴대폰으로 찾기 <input type="radio" onClick={phonefind} checked={!orFind}/></span>
                </div>
                {orFind && (
                    <div className='findmain'>
                    <div>
                        <span className='longinput'>이름</span>
                        <span className='longinput'><input type="text" /></span>
                    </div>
                    <div>
                        <span>아이디</span>
                        <span className='longinput'><input type="text" /></span>
                    </div>
                    <div>
                        <span>이메일</span>
                        <span>
                            <input type="text" />
                            <span>@</span>
                            <span>
                                <select name="email">
                                    <option value="naver">naver.com</option>
                                    <option value="daum">daum.net</option>
                                    <option value="nate">nate.com</option>
                                </select>
                            </span>
                        </span>
                    </div>
                    <div className='findmainbtn'>
                        <button>아이디 찾기</button>
                    </div>
                </div>
                )}
                {!orFind && (
                    <div className='findmain'>
                    <div>
                        <span>이름</span>
                        <span className='longinput'><input type="text" /></span>
                    </div>
                    <div>
                        <span>아이디</span>
                        <span className='longinput'><input type="text" /></span>
                    </div>
                    <div>
                        <span>휴대폰</span>
                        <span className='longinput'>
                            <input type="number" placeholder='-제외'/>
                        </span>
                    </div>
                    <div className='findmainbtn'>
                        <button>아이디 찾기</button>
                    </div>
                </div>
                )}
                
            </div>
            </>
        )}
    </div>
  )
}

export default Find
