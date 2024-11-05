import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';

import './App.css';
import FileList from './pages/FileList';
import Nodes from './pages/Nodes';
import { toast, ToastContainer } from 'react-toastify';
import Home from './pages/Home';

export const context = React.createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => {}]);
export const filesContext = React.createContext<[any, Dispatch<SetStateAction<any>>]>([[], () => {}]);
export const peersContext = React.createContext<[any, Dispatch<SetStateAction<any>>]>([[], () => {}]);

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [peersList, setPeersList] = useState([]);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    
    if (isConnected) {
      toast.success('Đã kết nối với server!')
    }
    else 
      toast.error("Đã ngắt kết nối với server!")
  }, [isConnected]);

  return (
    <context.Provider value={[isConnected, setIsConnected]}>
      <filesContext.Provider value={[filesList, setFilesList]}>
        <peersContext.Provider value={[peersList, setPeersList]}>
          <ToastContainer />
          <Router>
              <div className='text-center'>
                {/* <Link className='btn btn-secondary' to={'/'}>Home</Link> */}
                {/* <Link className='btn btn-secondary  mx-2' to={'/download'}>Download</Link> */}
                {/* <Link className='btn btn-secondary' to={'/nodes'}>Nodes</Link> */}
              </div>
              <Routes>
                <Route path="/filelist" element={<FileList />} />
                <Route path="/nodes" element={<Nodes />} />
                <Route path="/" element={<Home />} />
              </Routes>
          </Router>
        </peersContext.Provider>
      </filesContext.Provider>
    </context.Provider>
  );
}
