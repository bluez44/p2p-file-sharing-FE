import React, { useContext } from 'react'
import { context } from '../App'
// import { Button } from 'react-bootstrap'
// import { ToastContainer, toast } from 'react-toastify';

export default function Content({ children }) {
  const [isConnected, setIsConnected] = useContext(context)
  
  const handleOnClick = () => {
    setIsConnected(true)
    // toast.success('Đã kết nối với server!')
  }

  const handleClose = () => {
    setIsConnected(false)
    // toast.info("Đã ngắt kết nối với server!")
  }
  
  return (
      <div className='text-center wrapper'>
          {!isConnected && 
            <div className='d-flex flex-column justify-content-center align-items-center my-4'>
              <textarea className='p-2 magenet-text' rows="4" cols="100" placeholder='Nhập magnet text' required></textarea>
              <button className='btn btn-primary mt-4 ' onClick={handleOnClick}>Kết nối tới máy chủ</button>
            </div>
          }
          {/* <ToastContainer /> */}

          {isConnected && children}

          {isConnected && 
          <button className='btn btn-danger mt-4' onClick={handleClose}>Ngắt kết nối với máy chủ</button>}
      </div>
  )
}
