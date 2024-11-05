import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { context, filesContext, peersContext } from '../App'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';
// import axios, { Axios } from 'axios';

// import { Button } from 'react-bootstrap'
// import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [isConnected, setIsConnected] = useContext(context);

  const [torrentFilePath, setTorrentFilePath] = useState('')
  
  const [uploadFile, setUploadFile] = useState(null)

  const [magnetText, setMagnetText] = useState('')
  
  const [savedMagnetText, setSavedMagnetText] = useState(JSON.parse(localStorage.getItem('magnetText')) || [])

  const [saveTorrentPath, setSaveTorrentPath] = useState('asdfasdfqwers');

  const [torrentPath, setTorrentPath] = useState('');
  
  const [fileList, setFileList] = useContext(filesContext)

  const [peersList, setPeersList] = useContext(peersContext)

  const [state, setState] = useState('download')

  const [resMagnetText, setResMagnetText] = useState('')

  useEffect(()  => {
    console.log(torrentFilePath)
  }, [torrentFilePath])

  const nagative = useNavigate()

  const handleOnClick = (e) => {
    e.preventDefault()

    // Gửi request cho tracker
    
    if(state == 'download') {
      if(magnetText) {
        axios.get('/magnet_text', {
          params: {
              magnet_text: magnetText,
              path: torrentPath
          }
        }).then(res => {
            console.log(res, torrentPath)

            setFileList([...fileList, 
              {
                'magnetText': res.data.magnet_text,
                'fileName': torrentPath.slice(torrentPath.lastIndexOf('\\') + 1),
              }
            ])
            setPeersList([...peersList, res.data.peers])

            if(!savedMagnetText.includes(res.data.magnet_text)) {
              console.log('savedMagnetText', savedMagnetText);
              
              setSavedMagnetText([
                ...savedMagnetText,
                res.data.magnet_text
              ])
            }
        })
        .then(() => {
            setTorrentPath('')
        
            setMagnetText('')
  
            setIsConnected(true)
        })
        .catch(err => {
          console.log(err)
        })
      } 
      else if(torrentFilePath) {
        axios.get('/torrent_file', {
          params: {
            torrentPath: torrentFilePath,
            downloadPath: torrentPath
          }
        }).then(res => {
            console.log(res, torrentPath)

            setFileList([...fileList, 
              {
                'magnetText': res.data.magnet_text,
                'fileName': torrentPath.slice(torrentPath.lastIndexOf('\\') + 1),
              }
            ])
            setPeersList([...peersList, res.data.peers])

            if(!savedMagnetText.includes(res.data.magnet_text)) {
              console.log('savedMagnetText', savedMagnetText);
              
              setSavedMagnetText([
                ...savedMagnetText,
                res.data.magnet_text
              ])
            }
        })
        .then(() => {
            setTorrentPath('')
        
            setMagnetText('')
  
            setIsConnected(true)
        })
        .catch(err => {
          console.log(err)
        })
      }
      
      setTimeout(() => {
        nagative('/filelist')
      }, 100)
    }
    else if(state == 'upload') {
      axios.post('http://localhost:9999/magnet_text', null, {
        params: {
          path: uploadFile.path,
        }
      })
      .then(res => {
          // console.log(res)
          // console.log(res.data)
          if(!savedMagnetText.includes(res.data.magnet_text)) {
            console.log('savedMagnetText', savedMagnetText);
            
            setSavedMagnetText([
              ...savedMagnetText,
              res.data.magnet_text
            ])
          }
          setResMagnetText(res.data.magnet_text)

          setFileList([...fileList, 
            {
              'magnetText': res.data.magnet_text,
              'fileName': uploadFile.slice(uploadFile.lastIndexOf('\\') + 1),
            }
          ])
          setPeersList([...peersList, res.data.peers])
      })
      .catch(err => {
          console.log(err)
      })

      console.log('teststst');
        
    }
  }

  useEffect(() => {
    if(torrentFilePath || magnetText) {
      setState('download')
    }
    else {
      setState('upload')
    }
  }, [torrentFilePath, uploadFile, magnetText])

  useEffect(() => {
    localStorage.setItem('magnetText', JSON.stringify(savedMagnetText))
  }, [savedMagnetText])

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

  const selectFile = async (e) => {
    e.preventDefault()
    const path = await window.electronAPI.openFileDialog();
    if (path) {
        setTorrentFilePath(path);
    }
  };

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
        <div className='d-flex flex-column justify-content-center align-items-center h-100'>
            <form action='' className='overflow-auto h-100'>
                <div>
                    <p className='fs-1'>Tải file từ máy chủ</p>
                    <textarea 
                        disabled={torrentFilePath || uploadFile}
                        value={magnetText} 
                        className='p-2 magenet-text' 
                        rows="4" cols="100" 
                        placeholder='Nhập magnet text' 
                        required
                        onChange={(event) => {setMagnetText(event.target.value)}}
                    />
                    <p>Hoặc chọn file .torrent</p>
                    <div 
                      className='mb-4'
                      // className='d-flex w-100 justify-content-center align-items-center gap-2 mb-2'
                    >
                        {/* <p style={{ padding: 0, margin: 0}}></p>
                        <input disabled={magnetText || uploadFile} accept='.torrent' type='file' onChange={(event) => {setTorrentFile(event.target.files[0])}}></input>
                        {
                            torrentFile && <button className='btn btn-sm btn-danger' onClick={e => setTorrentFile(null)}>Xóa file</button>
                        } */}
                        <p className={`${!torrentFilePath ? 'text-warning' : ''}`}>
                        {
                            torrentFilePath ? `Đường dẫn file torrent của bạn là: ${torrentFilePath}` : 'Bạn chưa chọn đường dẫn file torrent'
                        
                        }
                        </p>
                        <div>
                            <button disabled={uploadFile || magnetText} className='btn btn-primary' onClick={e => selectFile(e)}>Chọn đường dẫn của file torrent</button>
                            {torrentFilePath &&  <button className='btn btn-danger mx-4' onClick={e => {e.preventDefault();  setTorrentFilePath('')}}>Xóa đường dẫn lưu file torrent</button>}
                        </div>
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
                        <input disabled={magnetText || torrentFilePath} accept='*' type='file' onChange={(event) => {setUploadFile(event.target.files[0])}}></input>
                        {
                            uploadFile && <button className='btn btn-sm btn-danger' onClick={e => setUploadFile(null)}>Xóa file</button>
                        }
                    </div>
                    <p className='long-text'>
                        {
                            resMagnetText ? `Magnet của bạn text là: ${resMagnetText}` : ''
                        }
                    </p>
                    {/* <p className={`${!saveTorrentPath ? 'text-warning' : ''}`}>
                        {
                            saveTorrentPath ? `Đường dẫn lưu file của bạn là: ${saveTorrentPath}` : 'Bạn chưa chọn nơi lưu file'
                        
                        }
                    </p> */}
                    {/* <div>
                        <button disabled={magnetText || torrentFile} className='btn btn-primary' onClick={e => handleSaveTorrent(e)}>Chọn đường dẫn lưu file .torrent</button>
                        {saveTorrentPath &&  <button className='btn btn-danger mx-4' onClick={e => {e.preventDefault();  setSaveTorrentPath('')}}>Xóa đường dẫn lưu file</button>}
                    </div> */}
                </div>
                <hr/>
                {
                    !isConnected &&
                    <button
                    className='btn btn-primary mt-4' 
                    type='submit' 
                    onClick={e => handleOnClick(e)} 
                    disabled={ ((!magnetText && !torrentFilePath) || !torrentPath) && (!uploadFile || !saveTorrentPath) }
                    >
                        {state === 'download' ? 'Tải về' : 'Chia sẻ'}
                    </button>
                }
            </form>
        </div>
          
          
          {/* <ToastContainer /> */}

          {isConnected && 
            <div>
              <button 
                // disabled={(!magnetText && !torrentFile) || !path} 
                onClick={handleOnClick} className='btn btn-secondary mt-4 mx-2'
                disabled={ ((!magnetText && !torrentFilePath) || !torrentPath) && 
                           (!uploadFile || !saveTorrentPath) }
              >
                Nhập magnet text
              </button>
              <button className='btn btn-danger mt-4' onClick={handleClose}>Ngắt kết nối với máy chủ</button>
            </div>
          } 
      </div>
  )
}
