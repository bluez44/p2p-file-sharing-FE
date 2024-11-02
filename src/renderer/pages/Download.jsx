import React, { useState, useEffect, useContext } from 'react';
import axios from '../api';
import Content from '../components/Content';

function Download() {
  const [progress, setProgress] = useState(0);
  const fileId = new URLSearchParams(window.location.search).get('fileId');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios.get(`/tracker/progress?fileId=${fileId}`).then((response) => {
//         setProgress(response.data.progress);
//       });
//     }, 1000);
    
//     return () => clearInterval(interval);
//   }, [fileId]);
    console.log(fileId)

  return (
    <Content>
        <h2>Tải tệp - {fileId}</h2>
        <p>Tiến trình tải xuống: {progress}%</p>
        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
            <div
            style={{
                width: `${progress}%`,
                backgroundColor: '#4caf50',
                height: '20px'
            }}
            />
        </div>
    </Content>
  );
}

export default Download;
