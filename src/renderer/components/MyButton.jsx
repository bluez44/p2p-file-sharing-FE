import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import MyModal from './MyModal';

export default function MyButton({ status = 'error', id = 1, name = 'test' }) {
    if (status === 'ready')
      return (
        <div className='d-flex justify-content-center align-items-center'>
          <Link className='btn btn-sm btn-outline-primary' to={`/download?fileId=${id}`}>Tải xuống</Link>
          <MyModal name={name} id={id}/>      
        </div>
      )
      

    if (status === 'error')
        return (
        <div className='d-flex justify-content-center align-items-center'>
            <button disabled className='btn btn-sm btn-outline-danger' to={`/download?fileId=${id}`}>Lỗi</button>
            <MyModal name={name} id={id}/>      
        </div>
        )

    if (status === 'done')
        return (
            <div className='d-flex justify-content-center align-items-center'>
            <span className='badge bg-success rounded-pill'>Đã tải</span>
            <MyModal name={name} id={id}/>      

            </div>
        ) 
      

    if (status === 'download' || status === 'upload') 
        return (
            <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-sm btn-outline-warning' 
                    onClick={
                    // () => axios.get(`/tracker/stop?fileId=${file.id}`)
                    () => console.log(id)
                    }
            >
                Tạm dừng
            </button>
            <MyModal name={name} id={id}/>      

            </div>
        )
}
