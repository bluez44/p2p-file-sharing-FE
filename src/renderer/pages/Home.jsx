import React, { useContext, useEffect, useState } from 'react';
import axios from '../api';

import Content from '../components/Content';
import { Link } from 'react-router-dom';

function Home() {
  const [files, setFiles] = useState(
    [
      {
        name: 'asdfkjjhqbweorkijhaksldjvbklasjdhvalskdjhfalksdfjh',
        id: 1,
        size: 32,
        status: 'downloading'
      },
      {
        name: 'asdfkjjhqbweorkijhaksldjvbklasjdhvalskdjhfalksdfjh',
        id: 2,
        size: 32,
        status: 'ready'
      },
      {
        name: 'asdfkjjhqbweorkijhaksldjvbklasjdhvalskdjhfalksdfjh',
        id: 3,
        size: 32,
        status: 'done'
      },
      {
        name: 'asdfkjjhqbweorkijhaksldjvbklasjdhvalskdjhfalksdfjh',
        id: 4,
        size: 32,
        status: 'downloading'
      },
        
        
    ]);


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
                  <span className='d-inline-block'>{file.name} - {file.size} MB</span>
                  {file.status === 'downloading' &&
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                      <div class="progress-bar bg-success" style={{width: '25%'}}></div>
                    </div>
                  }
                </div>
                {file.status === 'ready' && <Link className='btn btn-sm btn-outline-primary' to={`/download?fileId=${file.id}`}>Tải xuống</Link>}
                {file.status === 'done' && <span className='badge bg-success rounded-pill'>Đã tải</span>}
                {file.status === 'downloading' && 
                  <Link className='btn btn-sm btn-outline-warning' 
                        onClick={
                          // () => axios.get(`/tracker/stop?fileId=${file.id}`)
                          () => console.log(file.id)
                        }
                  >
                    Tạm dừng
                  </Link>
                }
            </li>
            ))}
        </ul>
    </Content>
  );
}

export default Home;
