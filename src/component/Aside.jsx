import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';
import kakaoTalkPhoto from '../image/KakaoTalk_Photo_2024-09-19-18-17-35.png';

const Aside = ({ showPhotoAlbum }) => {
    const photolists = UseFetch('http://localhost:3001/photoList');
    const [localPhotoLists, setLocalPhotoLists] = useState([]);
    const [newPhotoName, setNewPhotoName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showInputFields, setShowInputFields] = useState(false);
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        setLocalPhotoLists(photolists);
    }, [photolists]);

    const handleAddPhotoList = () => {
        if (newPhotoName.trim() === '') {
            alert('사진 이름을 입력해 주세요.');
            return;
        }

        const newPhoto = { nav: newPhotoName };

        fetch('http://localhost:3001/photoList', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPhoto)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`추가 실패: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            setLocalPhotoLists(prevLists => [
                ...prevLists,
                { id: data.id, nav: newPhotoName }
            ]);
            setNewPhotoName('');
        })
        .catch(err => {
            console.error('추가 오류:', err);
        });
    };

    const handleRemovePhoto = (id) => {
        setLocalPhotoLists(prevLists => prevLists.filter(photo => photo.id !== id));

        fetch(`http://localhost:3001/photoList/${id}`, {
            method: 'DELETE',
        }).catch(err => {
            console.error('삭제 오류:', err);
        });
    };

    const handleSaveAllEdits = () => {
        const updatePromises = Object.keys(editValues).map(id => {
            const navValue = editValues[id];
            if (navValue.trim() === '') {
                alert(`ID ${id}에 대한 사진 이름을 입력해 주세요.`);
                return Promise.resolve();
            }
    
            const oldNav = localPhotoLists.find(photo => photo.id === id)?.nav; // Get old nav value
    
            // Update photoList
            const updatePhotoListPromise = fetch(`http://localhost:3001/photoList/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nav: navValue })
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`photoList 수정 실패: ${res.status} ${res.statusText}`);
                }
                // Update local state for photoList
                setLocalPhotoLists(prevLists => 
                    prevLists.map(photo => 
                        photo.id === id ? { ...photo, nav: navValue } : photo
                    )
                );
            });
    
            // Update photo with new nav value
            const updatePhotoPromise = fetch(`http://localhost:3001/photo`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldNav, newNav: navValue }) // oldNav와 newNav를 포함
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`photo 수정 실패: ${res.status} ${res.statusText}`);
                }
            }).then(() => {
                console.log('Successfully updated photo nav:', oldNav, '->', navValue);
            }).catch(err => {
                console.error('photo 수정 오류:', err);
            });
    
            return Promise.all([updatePhotoListPromise, updatePhotoPromise]);
        });
    
        Promise.all(updatePromises)
            .then(() => {
                alert('수정이 완료되었습니다.');
                if (newPhotoName.trim() !== '') {
                    handleAddPhotoList();
                }
                setIsEditing(false);
                setEditValues({});
                setShowInputFields(false);
            })
            .catch(err => {
                console.error('수정 오류:', err);
            });
    };
    
    const handleInputChange = (id, value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [id]: value
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

                    <div className='asideBottom s-b'>
                        <div>HISTORY</div>
                        <div>upDown</div>
                    </div>

                    <div className='asideLast'>
                        <div className='asideLastflex'>
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
                                    <Link to={`/photo/${list.nav}`}>{list.nav}</Link>
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
                                        value={newPhotoName}
                                        onChange={(e) => setNewPhotoName(e.target.value)}
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
