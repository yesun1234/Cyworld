import React from 'react'
import Header from './component/Header'
import Aside from './component/Aside'
import Main from './component/Main'
import Nav from './component/Nav'

const App = () => {
  return (
    <div className='app'>
      <div className='outline'></div>
      <div className='inline'></div>
      <div className='bgs'></div>
      <Header />
      <Aside />
      <Main />
      <Nav />
    </div>
  )
}

export default App
