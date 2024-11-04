import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { context } from '../App'
import { Link, useNavigate } from 'react-router-dom';
// import axios from '../api';
import axios, { Axios } from 'axios';

// import { Button } from 'react-bootstrap'
// import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [isConnected, setIsConnected] = useContext(context);

  const [torrentFile, setTorrentFile] = useState(null)
  
  const [uploadFile, setUploadFile] = useState(null)

  const [magnetText, setMagnetText] = useState('')
  
  const [savedMagnetText, setSavedMagnetText] = useState(JSON.parse(localStorage.getItem('magnetText')) || [])

  useEffect(()  => {
    console.log(torrentFile)
  }, [torrentFile])

//   useEffect(()  => {
//       axios.get('http://localhost:9999/magenet_text', {
//             params: {
//             magnet_text: magnetText,
//             path: torrentPath
//             }
//         }
//       ).then(res => {
//           console.log(res.data)
//       })
//   })

//   useEffect(()  => {
//       axios.post('http://localhost:9999/magenet_text', {
//             params: {
//                 path: saveTorrentPath
//             }
//         }
//       ).then(res => {
//           console.log(res.data)
//       })
//   })

  

  const nagative = useNavigate()
  const handleOnClick = () => {
    // Gửi request cho tracker
    if(magnetText) {
        setSavedMagnetText([
            ...savedMagnetText,
            magnetText
        ])
    }
    else if(magnetText === '' && torrentFile != null) {
        setSavedMagnetText([
            ...savedMagnetText,
            torrentFile.name
        ])
    }
    else {
        setSavedMagnetText([
            ...savedMagnetText,
            uploadFile.name
        ])
    }

    fetch('http://localhost:9999/magnet_text', {
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:9999'}
        // body: JSON.stringify({
        //     magnet_text: magnetText,
        //     path: torrentFile
        // })
    })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
    
    // axios.get('http://localhost:9999/magenet_text', {
    //       params: {
    //         magnet_text: magnetText,
    //         path: torrentPath
    //       },
    //   }
    // ).then(res => {
    //     console.log(res.data)
    // }).catch(err => {
    //     console.log(err)
    // })
    
    setTorrentPath('')
    
    setMagnetText('')
    // console.log(window.localStorage.setItem('magnetText', [...savedMagnetText, magnetText]))
    setIsConnected(true)
    
    setTimeout(() => {
      nagative('/filelist')
    }, 100)
    // nagative('/filelist')
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

  const handleClose = () => {
    setIsConnected(false)
    // toast.info("Đã ngắt kết nối với server!")
  }

  const handleSelectFile = async (e) => {
    e.preventDefault();

    const filePath = await window.electronAPI.showSaveDialog();
    if (filePath) {
      // Proceed with file-saving logic here, e.g., save file content at `filePath`
      setTorrentPath(filePath);
      console.log('Selected file path:', filePath);
      // Perform file writing logic here
    } else {
      console.log('Save dialog was canceled');
    }
  };

  const [torrentPath, setTorrentPath] = useState('');
//   const handleSelectFolder = async (e) => {
//     e.preventDefault();

//     const folderPath = await window.electronAPI.showFolderDialog();
//     if (folderPath) {
//       console.log('Selected folder path:', folderPath);
//       setTorrentPath(folderPath);
//       // Use the folder path for your logic, e.g., saving files in this folder
//     } else {
//       console.log('Folder selection was canceled');
//     }
//   };

  const [saveTorrentPath, setSaveTorrentPath] = useState('');
  const handleSaveTorrent = async (e) => {
    e.preventDefault();

    const folderPath = await window.electronAPI.showSaveDialog();
    if (folderPath) {
      console.log('Selected folder path:', folderPath);
      setSaveTorrentPath(folderPath);
      // Use the folder path for your logic, e.g., saving files in this folder
    } else {
      console.log('Folder selection was canceled');
    }
  };
  
  if(uploadFile) {
      console.log(uploadFile.path)
  }

  return (
      <div className='text-center wrapper'>
        <div className='d-flex flex-column justify-content-center align-items-center my-4'>
            <form action=''>
                <div>
                    <p className='fs-1'>Tải file từ máy chủ</p>
                    <textarea 
                        disabled={torrentFile || uploadFile}
                        value={magnetText} 
                        className='p-2 magenet-text' 
                        rows="4" cols="100" 
                        placeholder='Nhập magnet text' 
                        required
                        onChange={(event) => {setMagnetText(event.target.value)}}
                    />
                    <p>Hoặc chọn file .torrent</p>
                    <div className='d-flex w-100 justify-content-center align-items-center gap-2 mb-2'>
                        <p style={{ padding: 0, margin: 0}}></p>
                        <input disabled={magnetText || uploadFile} accept='.torrent' type='file' onChange={(event) => {setTorrentFile(event.target.files[0])}}></input>
                        {
                            torrentFile && <button className='btn btn-sm btn-danger' onClick={e => setTorrentFile(null)}>Xóa file</button>
                        }
                    </div>
                    <div>
                        <p className={`${!torrentPath ? 'text-warning' : ''}`}>
                        {
                            torrentPath ? `Đường dẫn lưu file của bạn là: ${torrentPath}` : 'Bạn chưa chọn nơi lưu file'
                        
                        }
                        </p>
                        <div>
                            <button disabled={uploadFile} className='btn btn-primary' onClick={e => handleSelectFile(e)}>Chọn đường dẫn lưu file</button>
                            {torrentPath &&  <button className='btn btn-danger mx-4' onClick={e => {e.preventDefault();  setTorrentPath('')}}>Xóa đường dẫn lưu file</button>}
                        </div>
                    </div>
                </div>
                <hr/>
                
                <div>
                    <p className='fs-1'>Chia sẻ file lên máy chủ</p>
                    <div className='d-flex w-100 justify-content-center align-items-center gap-2 mb-2'>
                        <p style={{ padding: 0, margin: 0}}></p>
                        <input disabled={magnetText || torrentFile} accept='*' type='file' onChange={(event) => {setUploadFile(event.target.files[0])}}></input>
                        {
                            uploadFile && <button className='btn btn-sm btn-danger' onClick={e => setUploadFile(null)}>Xóa file</button>
                        }
                    </div>
                    <p className={`${!saveTorrentPath ? 'text-warning' : ''}`}>
                        {
                            saveTorrentPath ? `Đường dẫn lưu file của bạn là: ${saveTorrentPath}` : 'Bạn chưa chọn nơi lưu file'
                        
                        }
                    </p>
                    <div>
                        <button disabled={magnetText || torrentFile} className='btn btn-primary' onClick={e => handleSaveTorrent(e)}>Chọn đường dẫn lưu file .torrent</button>
                        {saveTorrentPath &&  <button className='btn btn-danger mx-4' onClick={e => {e.preventDefault();  setSaveTorrentPath('')}}>Xóa đường dẫn lưu file</button>}
                    </div>
                </div>
                <hr/>
                {
                    !isConnected &&
                    <button
                    className='btn btn-primary mt-4' 
                    type='submit' 
                    onClick={handleOnClick} 
                    disabled={ ((!magnetText && !torrentFile) || !torrentPath) && (!uploadFile || !saveTorrentPath) }
                    >
                        Kết nối với máy chủ
                    </button>
                }
            </form>
        </div>
          
          
          {/* <ToastContainer /> */}

          {isConnected && 
            <div>
              <button 
                // disabled={(!magnetText && !torrentFile) || !path} 
                onClick={handleOnClick} className='btn btn-secondary mt-4 mx-2'>
                Nhập magnet text
              </button>
              <button className='btn btn-danger mt-4' onClick={handleClose}>Ngắt kết nối với máy chủ</button>
            </div>
          } 
      </div>
  )
}
