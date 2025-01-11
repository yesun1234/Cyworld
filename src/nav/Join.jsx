import React, { useEffect, useState, useRef } from 'react';
import Img from '../image/logo.svg';
import { Link } from 'react-router-dom';

const Join = () => {
    
    const fetchJoin = async () => {
        try {
            const response = await fetch('http://localhost:3001/member'); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); 
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    };
    
    useEffect(() => {
        fetchJoin();
    }, []);    

    const years = [];
    for (let i = 1930; i <= 2005; i++) {
        years.push(i);
    }

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [days, setDays] = useState([]);
    const [step, setStep] = useState(1);
    const [finishi, setFinish] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const yearRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();

    const getDaysInMonth = (year, month) => {
        if (!year || !month) return 31;

        if (month === 2) {
            return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
        }

        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
            return 31;
        } else {
            return 30;
        }
    };

    useEffect(() => {
        if (selectedYear && selectedMonth) {
            const dayCount = getDaysInMonth(Number(selectedYear), Number(selectedMonth));
            setDays(Array.from({ length: dayCount }, (_, index) => index + 1));
        }
    }, [selectedYear, selectedMonth]);

    const handleSubmit = async () => {
        if (!username || !password || !confirmPassword || !name || !phone || !gender || !selectedYear || !selectedMonth || !selectedDay) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
    
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
    
        const userData = {
            username,
            password,
            name,
            phone,
            gender,
            dob: `${selectedYear}-${selectedMonth}-${selectedDay}`, // 생년월일 조합
        };
    
        try {
            const response = await fetch('http://localhost:3001/member', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData), // JSON 형식으로 변환
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Server response:', result);
            alert('회원가입이 완료되었습니다!');
            setStep(2);
            setFinish(true);
        } catch (error) {
            console.error('Error during registration:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };
    

    return (
        <div className='join'>
            <div className='joinLogo'>
                <span>
                    <Link to='/'>
                    <img src={Img} alt="logo" />
                    </Link>
                </span>
                <span>
                    <Link to='/join' onClick={() => window.location.reload()}>
                    회원가입
                    </Link>
                    </span>
            </div>
            <div className='joinTop'>
                <span style={{ background: step === 1 ? '#ff4949' : ''}}>1. 정보입력</span>
                <span style={{ background: step === 2 ? '#ff4949' : ''}}>2. 회원가입 완료</span>
            </div>
            {!finishi && (
            <>
            <span className='joinStart'>프로필입력</span>
            <div className='joinMain'>
                <ul>
                    <li>
                        <span>아이디</span>
                        <span>
                            <input type="text" ref={usernameRef} value={username} onChange={(e)=> setUsername(e.target.value)}/>
                            @ 
                            <select name="email" id="">
                                <option value="naver">naver.com</option>
                                <option value="nate">nate.com</option>
                                <option value="daum">daum.net</option>
                                <option value="">직접 작성하기</option>
                            </select> 
                        </span>
                        <button>중복확인</button>
                        <span>영문소문자,숫자 조합6-40(-_사용가능)</span>
                    </li>
                    <li>
                        <span>비밀번호</span>
                        <span>
                            <input
                                type="password"
                                ref={passwordRef}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </span>
                    </li>
                    <li>
                        <span>비밀번호 확인</span>
                        <span>
                            <input
                                type="password"
                                ref={confirmPasswordRef}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </span>
                    </li>
                    <li>
                        <span>이름</span>
                        <span>
                            <input
                                type="text"
                                ref={nameRef}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </span>
                    </li>
                    <li>
                        <span>휴대폰</span>
                        <span>
                            <input
                                type="number"
                                ref={phoneRef}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='-제외'
                            />
                        </span>
                    </li>
                    <li>
                        <span>성별</span>
                        <span>
                            <input type="radio" name="gender" value="male" onChange={(e)=> setGender(e.target.value)}/>
                            <span className="custom-radio"></span> 남자
                        </span>
                        <span>
                            <input type="radio" name="gender" value="female" onChange={(e)=> setGender(e.target.value)}/>
                            <span className="custom-radio"></span> 여자
                        </span>
                    </li>
                    <li>
                        <span>생년월일</span>
                        <span>
                            <select
                                name="year"
                                ref={yearRef}
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <option value="">년도</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            년
                            <select
                                name="month"
                                ref={monthRef}
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                <option value="">월</option>
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            월
                            <select
                                name="day"
                                ref={dayRef}
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                            >
                                <option value="">일</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                            일
                        </span>
                    </li>
                </ul>
            </div>
            <div className='joinNext'>
                <button onClick={handleSubmit}>다음</button>
            </div>
            </>
            )}
            {finishi && (
                <>
                <span className='joinStart'>회원가입 완료</span>
                <div className="finishMessage">
                    <h2>회원가입이 완료되었습니다!</h2>
                    <Link to='/'><button>로그인 하기</button></Link>
                </div>
                </>
            )}
        </div>
    );
};

export default Join;