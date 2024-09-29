import React, { useEffect, useState } from 'react';

const UseFetch = (url) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
    };
    
    fetchData();
  }, [url]);  // 의존성 배열에 `url` 추가
  
  return data;
};

export default UseFetch;
