import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';

import { context, filesContext } from '../App';
// import axios from '../api';
import Content from '../components/Content';
import ProgressBar from '../components/ProgressBar';
import MyButton from '../components/MyButton';
import { Icon } from '@iconify/react';

function FileList() {
  const [filesList, setFilesList] = useContext(filesContext)
  const [urls, setUrls] = useState([]);

  const [downloaded, setDownloaded] = useState([])

  const [uploaded, setUploaded] = useState([])

  const [fileLength, setFileLength] = useState([])

  const [fileStatus, setFileStatus] = useState([])

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setUrls(filesList.map(file => `http://localhost:9999/info?magnet_text=${file.magnetText}`)); 
  }, [filesList]);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      const requests = urls.map((url) => axios.get(url));
  
      axios.all(requests).then((responses) => {
        responses.forEach((resp, index) => {
          console.log(resp.data, index);
          
          if(index >= downloaded.length) {
            setDownloaded([...downloaded, resp.data.downloaded])
            setUploaded([...uploaded, resp.data.uploaded])
            setFileLength([...fileLength, resp.data.length])

            if( (resp.data.downloaded/1024)/(resp.data.length*512) < 1 ) {
              setFileStatus([...fileStatus, 'downloading'])
            }
            else {
              setFileStatus([...fileStatus, 'completed'])
            }
          }
          else {
            downloaded[index] = resp.data.downloaded/1024;
            uploaded[index] = resp.data.uploaded/1024;
            fileLength[index] = resp.data.length*512;

            if( (resp.data.downloaded/1024)/(resp.data.length*512) < 1 ) {
              fileStatus[index] = 'downloading'
            }
            else {
              fileStatus[index] = 'completed'
            }
          }

          // console.log(downloaded, uploaded, fileLength);
        });
      });

      setCounter(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer);
  })

  // console.log('filesList', filesList);

  console.log('RENDER')

  const savedMagnetText = JSON.parse(localStorage.getItem('magnetText')) || [];

  return (
    <Content>
        <h2 className='text-center'>Danh sách tệp tải xuống</h2>
        <Link className='link mb-4' to={'/nodes'}>Danh sách các Node</Link>
        <ul className='list-group list flex-grow-1'>
            {filesList.map((file, index) => (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
                <div className='d-flex align-items-start flex-column gap-2 file-infor'>
                  <span className='d-inline-block file-name'>{file.fileName}</span>
                  <span className='d-inline-block file-magnet'>Magnet text: {file.magnetText}</span>
                  <p className='' style={{fontSize: '11px', margin: '0'}}>Đã tải {downloaded[index]} KB trên tổng số {fileLength[index]} KB</p>
                  <ProgressBar status={fileStatus[index]} width={`${((downloaded[index]/fileLength[index])*100).toFixed(0)}`} />
                  <p className='' style={{fontSize: '11px', margin: '0'}}>Đã chia sẻ {uploaded[index]/1024} KB</p>
                </div>
                <MyButton status={fileStatus[index]} />
            </li>
            ))}
            <li className='list-group-item text-start font-weight-bold'>Tập tin trong lưu trũ cục bộ</li>
            {savedMagnetText.length > 0 && savedMagnetText.map((text, index) => (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>  
                <span className='d-inline-block'>{text}</span>
                {/* <Icon className='share' icon="ooui:share" /> */}
            </li>
            ))}
        </ul>
        <hr/>
    </Content>
  );
}

export default FileList;
