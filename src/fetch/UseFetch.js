import React, { useEffect, useState } from 'react'

const UseFetch = (url) => {
  const [nav, setNav] = useState([]);
  useEffect(()=>{
    fetch(url)
    .then(res => {return res.json()})
    .then(nav => setNav(nav));
  })
  return nav;
}

export default UseFetch