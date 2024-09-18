import React from 'react'

const Aside = () => {
  return (
    <div className='aside'>
      <div className='asideTop'>
        <span>todays is..</span>
        <span>파이팅</span>
      </div>

      <div className='asidePhto'>
        <img src="/image/D0ACC240-7D9F-4371-BA79-F344033B781C.png" alt="사이월드 로고" />
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
    </div>
  )
}

export default Aside
