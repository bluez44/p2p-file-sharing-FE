import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { context } from '../App';
// import axios from '../api';
import Content from '../components/Content';
import ProgressBar from '../components/ProgressBar';
import MyButton from '../components/MyButton';
import { Icon } from '@iconify/react';

function FileList() {
  const [files, setFiles] = useState(
    [
      {
        name: 'test1',
        id: 1,
        size: 32,
        status: 'download'
      },
      {
        name: 'test2',
        id: 2,
        size: 32,
        status: 'ready'
      },
      {
        name: 'test4',
        id: 3,
        size: 32,
        status: 'done'
      },
      {
        name: 'set6',
        id: 4,
        size: 32,
        status: 'upload'
      },
      {
        name: 'test9',
        id: 5,
        size: 32,
        status: 'error'
      },
    ]);

  // useEffect(() => {
  //   axios.get('http://localhost:9999/infor', {
  //     params: {
  //       magenet_text: magnetText
  //     }
  //   }).then((response) => {
  //     console.log(response.data); 
  //   });
  // }, []);

  const savedMagnetText = JSON.parse(localStorage.getItem('magnetText')) || [];

  // const [testFiles, setTestFiles] = useState([]);

  // useEffect(() => {
  //   axios.get('/posts').then((response) => {
  //     setTestFiles(response.data);
  //   });
  // }, [])


//   useEffect(() => {
//     axios.get('/files').then((response) => {
//       setFiles(response.data);
//     });
//   }, []);

  return (
    <Content>
        <h2 className='text-start'>Danh sách tệp có thể tải xuống</h2>
        <Link className='link mb-4' to={'/nodes'}>Danh sách các Node</Link>
        <ul className='list-group list flex-grow-1'>
            {files.map((file) => (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={file.id}>
                <div className='d-flex align-items-start flex-column gap-2'>
                  <span className='d-inline-block'>{file.name}</span>
                  <p className='' style={{fontSize: '11px', margin: '0'}}>15 of {file.size} MB (25.61%) - 2hrs, 3min remaining</p>
                  <ProgressBar status={file.status} />
                  <p className='' style={{fontSize: '11px', margin: '0'}}>Download from {3} of {3} peers - DL: {390.8} KB/s, UL: {390.8} KB/s</p>
                </div>
                <MyButton status={file.status} id={file.id} name={file.name}/>
            </li>
            ))}
            <li className='list-group-item text-start font-weight-bold'>File in repo</li>
            {savedMagnetText.length > 0 && savedMagnetText.map((text, index) => (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
                <span className='d-inline-block'>{text}</span>
                <Icon className='share' icon="ooui:share" />
            </li>
            ))}
        </ul>
        <hr/>
    </Content>
  );
}

export default FileList;
