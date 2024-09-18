import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <div className='flex item-c'>
            
            <div className='leftHeader'>
                <div>
                    <span>TODAY</span>
                    <span>197</span>
                </div>
                <div>
                    <span>TOTAL</span>
                    <span>123455</span>
                </div>
            </div>

            <div className='flex s-b'>
                <div className='mainHeader'>
                    <h3>
                        사이좋은 사람들, 싸이월드
                    </h3>
                </div>

                <div className='rightHeader'>
                    <div>
                        <span>일촌맺기</span>
                        <span>팬되기</span>
                        <span>http://naver.com</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header