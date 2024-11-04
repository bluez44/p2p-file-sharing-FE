import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { context } from '../App'
import { Link, useNavigate } from 'react-router-dom';

// import { Button } from 'react-bootstrap'
// import { ToastContainer, toast } from 'react-toastify';

export default function Content({ children }) {
  const [isConnected, setIsConnected] = useContext(context);

  const [torrentFile, setTorrentFile] = useState(null)

  const [magnetText, setMagnetText] = useState('')
  
  const [savedMagnetText, setSavedMagnetText] = useState(JSON.parse(localStorage.getItem('magnetText')) || [])


  useEffect(()  => {
    console.log(torrentFile)
  }, [torrentFile])
  
  const handleOnClick = () => {
    // Gửi request cho tracker

    setSavedMagnetText([
      ...savedMagnetText,
      magnetText
    ])

    

    setMagnetText('')
    // console.log(window.localStorage.setItem('magnetText', [...savedMagnetText, magnetText]))
    setIsConnected(true)

    // handleSavedMagnetText()
    // toast.success('Đã kết nối với server!')
  }

  useEffect(() => {
    localStorage.setItem('magnetText', JSON.stringify(savedMagnetText))
  }, [savedMagnetText])

  // const handleSavedMagnetText = () => {
  //   setSavedMagnetText([
  //     ...savedMagnetText,
  //     magnetText
  //   ])

  //   ipcRenderer.send()

  //   ipcRenderer.send("save-file", savedMagnetText);

  //   console.log(savedMagnetText)
  // }

  const nagative = useNavigate()
  const handleClose = () => {
    setIsConnected(false)

    setTimeout(() => {
      nagative('/')
    }, 100)
    // toast.info("Đã ngắt kết nối với server!")
  }

  // const handleDownload = async () => {
  //   const filePath = await window.electronAPI.showSaveDialog();
  //   if (filePath) {
  //     // Proceed with file-saving logic here, e.g., save file content at `filePath`
  //     console.log('Selected file path:', filePath);
  //     // Perform file writing logic here
  //   } else {
  //     console.log('Save dialog was canceled');
  //   }
  // };

  const [path, setPath] = useState('');
  const handleSelectFolder = async (e) => {
    e.preventDefault();

    const folderPath = await window.electronAPI.showFolderDialog();
    if (folderPath) {
      console.log('Selected folder path:', folderPath);
      setPath(folderPath);
      // Use the folder path for your logic, e.g., saving files in this folder
    } else {
      console.log('Folder selection was canceled');
    }
  };
  
  return (
      <div className='text-center wrapper'>
          {/* {!isConnected && 
            <div className='d-flex flex-column justify-content-center align-items-center my-4'>
              <form action=''>
                <textarea 
                  value={magnetText} 
                  className='p-2 magenet-text' 
                  rows="4" cols="100" 
                  placeholder='Nhập magnet text' 
                  required
                  onChange={(event) => {setMagnetText(event.target.value)}}
                />
                <p>Hoặc chọn file .torrent</p>
                <div className='d-flex w-100 justify-content-center align-items-center gap-2'>
                  <p style={{ padding: 0, margin: 0}}></p>
                  <input accept='.torrent' type='file' onChange={(event) => {setTorrentFile(event.target.files[0])}}></input>
                </div>
                <hr/>
                <div>
                  <p>
                    {
                      path ? `Đường dẫn lưu file của bạn là: ${path}` : 'Bạn chưa chọn nơi lưu file'
                    
                    }
                  </p>
                  <button className='btn btn-primary' onClick={e => handleSelectFolder(e)}>Chọn đường dẫn lưu file</button>
                </div>
                <input 
                  className='btn btn-primary mt-4' 
                  type='submit' 
                  onClick={handleOnClick} 
                  value={'Kết nối tới máy chủ'}
                  disabled={(!magnetText && !torrentFile) || !path}
                />
              </form>
            </div>
          }
          <ToastContainer /> */}

          {isConnected && children}

          {isConnected && 
            <div>
              <Link to={'/'} className='btn btn-secondary mt-4 mx-2'>
                Trang chủ
              </Link>
              <button className='btn btn-danger mt-4' onClick={handleClose}>Ngắt kết nối với máy chủ</button>
            </div>
          } 
      </div>
  )
}
