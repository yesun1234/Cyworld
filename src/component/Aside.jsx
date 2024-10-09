import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';
import kakaoTalkPhoto from '../image/KakaoTalk_Photo_2024-09-19-18-17-35.png'
import Photo from '../nav/Photo';

const Aside = ({ showPhotoAlbum }) => {
    const photolists = UseFetch('http://localhost:3001/photoList');
    const [localPhotoLists, setLocalPhotoLists] = useState([]);
    const [newPhotoName, setNewPhotoName] = useState(''); // 새 사진 이름 상태 추가
    const [isEditing, setIsEditing] = useState(false);
    const [showInputFields, setShowInputFields] = useState(false);
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        setLocalPhotoLists(photolists);
    }, [photolists]);

    const handleAddPhotoList = () => {
        console.log("입력한 사진 이름:", newPhotoName);

        if (newPhotoName.trim() === '') {
            alert('사진 이름을 입력해 주세요.');
            return;
        }

        const newPhoto = {
            nav: newPhotoName
        };

        // Send the new photo to the API
        fetch('http://localhost:3001/photoList', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPhoto)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`추가 실패: ${res.status} ${res.statusText}`);
            }
            return res.json(); // API에서 응답받은 데이터 반환
        })
        .then(data => {
            // Update local state with the added photo to show it immediately
            setLocalPhotoLists(prevLists => [
                ...prevLists,
                { id: data.id, nav: newPhotoName } // API에서 반환된 ID를 사용하고, 입력한 nav 값 사용
            ]);
            setNewPhotoName(''); // 입력 필드 초기화
        })
        .catch(err => {
            console.error('추가 오류:', err);
        });
    };

    const handleRemovePhoto = (id) => {
        // 화면에서 삭제
        setLocalPhotoLists(prevLists => prevLists.filter(photo => photo.id !== id)); 

        // 서버 요청을 나중에 처리
        // fetch(`http://localhost:3001/photoList/${id}`, {
        //     method: 'DELETE',
        // }).catch(err => {
        //     console.error('삭제 오류:', err);
        // });
    };

    const handleSaveAllEdits = () => {
        const updatePromises = Object.keys(editValues).map(id => {
            const navValue = editValues[id];
            if (navValue.trim() === '') {
                alert(`ID ${id}에 대한 사진 이름을 입력해 주세요.`);
                return Promise.resolve();
            }
            return fetch(`http://localhost:3001/photoList/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nav: navValue })
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`수정 실패: ${res.status} ${res.statusText}`);
                }
                // 서버에서 수정된 내용을 로컬 상태에 반영
                setLocalPhotoLists(prevLists => {
                    return prevLists.map(photo => 
                        photo.id === id ? { ...photo, nav: navValue } : photo
                    );
                });
            });
        });

        Promise.all(updatePromises)
            .then(() => {
                alert('수정이 완료되었습니다.');
                // 추가된 사진 이름도 서버에 저장
                if (newPhotoName.trim() !== '') {
                    handleAddPhotoList(); // 새 사진 추가
                }
                setIsEditing(false); // 편집 모드 종료
                setEditValues({}); // 수정 후 입력 값 초기화
                setShowInputFields(false); // 입력 필드 숨기기
            })
            .catch(err => {
                console.error('수정 오류:', err);
            });
    };

    const handleInputChange = (id, value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [id]: value // Update editValues with the current input
        }));
    };

    return (
        <div className='aside'>
            {!showPhotoAlbum && (
                <>
                    <div className='asideTop'>
                        <span>todays is..</span>
                        <span>파이팅</span>
                    </div>

                    <div className='asidePhto'>
                    <img src={kakaoTalkPhoto} alt="카카오톡 사진" />

                    </div>

                    <div className='asideMain'>사이좋은 사람들 싸이월드 ^~^</div>

                    <div className='asideBottom flex s-b'>
                        <div>HISTORY</div>
                        <div>upDown</div>
                    </div>

                    <div className='asideLast'>
                        <div className='flex'>
                            <div>싸이월드</div>
                            <div>여 1999.07.07</div>
                        </div>
                        <div>dptjs1106@naver.com</div>
                    </div>
                </>
            )}

            {showPhotoAlbum && (
                <div className='photoside'>
                    <h4>PHOTO ALBUM</h4>
                    <ul>
                        <Link to={'/photo'}><li>전체보기</li></Link>
                        {localPhotoLists.map((list) => (
                            <li key={list.id} className='asideEdit'>
                                {isEditing ? (
                                    <input
                                        type='text'
                                        value={editValues[list.id] !== undefined ? editValues[list.id] : list.nav}
                                        onChange={(e) => handleInputChange(list.id, e.target.value)}
                                    />
                                ) : (
                                    // nav 값을 포함하여 링크 생성
                                    <Link key={list.id} to={`/photo/${list.nav}`}>{list.nav}</Link>
                                )}
                                {isEditing && (
                                    <button onClick={() => handleRemovePhoto(list.id)}>-</button>
                                )}
                            </li>
                        ))}
                    </ul>

                    {isEditing ? (
                        <>
                            <button className='editbutton' onClick={() => setShowInputFields(true)}>+</button>
                            {showInputFields && (
                                <div className='asideEdit'>
                                    <input 
                                        type="text" 
                                        value={newPhotoName} // 새 사진 이름 상태 사용
                                        onChange={(e) => setNewPhotoName(e.target.value)} // 입력 값 변경
                                        placeholder="사진 이름" 
                                    />
                                </div>
                            )}
                            <div className='phtoasidebutton'>
                                <button onClick={handleSaveAllEdits}>수정완료</button>
                            </div>
                        </>
                    ) : (
                        <div className='phtoasidebutton'>
                            <button onClick={() => setIsEditing(true)}>수정</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Aside;
