import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetch from '../fetch/UseFetch';

const Aside = ({ showPhotoAlbum }) => {
  const photolists = UseFetch('http://localhost:3001/photoList');
  const [localPhotoLists, setLocalPhotoLists] = useState([]); // Initialize with an empty array
  const idRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showInputFields, setShowInputFields] = useState(false);
  const [editValues, setEditValues] = useState({}); // Track the values being edited

  // Initialize localPhotoLists when photolists are fetched
  useEffect(() => {
    setLocalPhotoLists(photolists); // Copy fetched photo list into local state
  }, [photolists]);

  // Handle adding a new photo item (only locally)
  const handleAddPhotoList = () => {
    const newId = localPhotoLists.length ? localPhotoLists[localPhotoLists.length - 1].id + 1 : 1;
    const newPhoto = {
      id: newId,
      nav: idRef.current.value
    };

    setLocalPhotoLists(prevLists => [...prevLists, newPhoto]); // Add to local state
    idRef.current.value = ''; // Clear input field
  };

  // Handle removing a photo item (only locally)
  const handleRemovePhoto = (id) => {
    setLocalPhotoLists(prevLists => prevLists.filter(photo => photo.id !== id)); // Remove from local state
  };

  // Save all edits (including additions and deletions) to the API
  const handleSaveAllEdits = () => {
    const updatePromises = Object.keys(editValues).map(id => {
      return fetch(`http://localhost:3001/photoList/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nav: editValues[id] })
      }).then(res => {
        if (!res.ok) {
          throw new Error(`수정 실패: ${res.status} ${res.statusText}`);
        }
      });
    });

    // Handle added photos (new ones don't have an ID in the backend yet)
    const addPromises = localPhotoLists.filter(photo => !photolists.some(p => p.id === photo.id))
      .map(newPhoto => {
        return fetch('http://localhost:3001/photoList', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPhoto)
        });
      });

    // Handle removed photos (exist in the original list but not in the local one)
    const removePromises = photolists.filter(photo => !localPhotoLists.some(p => p.id === photo.id))
      .map(photoToRemove => {
        return fetch(`http://localhost:3001/photoList/${photoToRemove.id}`, {
          method: 'DELETE'
        });
      });

    // Wait for all updates, additions, and deletions to finish
    Promise.all([...updatePromises, ...addPromises, ...removePromises])
      .then(() => {
        alert('수정이 완료되었습니다.');
        setIsEditing(false); // Turn off editing mode after saving
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
            <img src="/image/KakaoTalk_Photo_2024-09-19-18-17-35.png" alt="사이월드 로고" />
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
          <h4>PHTO ALBUM</h4>
          <ul>
            {localPhotoLists.map((list) => (
              <li key={list.id} className='asideEdit'>
                {isEditing ? (
                  <input
                    type='text'
                    value={editValues[list.id] || list.nav}
                    onChange={(e) => handleInputChange(list.id, e.target.value)}
                  />
                ) : (
                  <Link to='/photo'>{list.nav}</Link>
                )}
                {isEditing && (
                  <>
                    <button onClick={() => handleRemovePhoto(list.id)}>-</button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {isEditing ? (
            <>
              <button className='editbutton' onClick={() => setShowInputFields(true)}>+</button>
              <div className='phtoasidebutton'>
                <button onClick={handleSaveAllEdits}>수정완료</button>
              </div>
              {showInputFields && (
                <div className='asideEdit'>
                  <input type="text" ref={idRef} placeholder="사진 이름" />
                  <button onClick={handleAddPhotoList}>추가</button>
                </div>
              )}
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
