import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';

import './App.css';
import Home from './pages/Home';
import Nodes from './pages/Nodes';
import { toast, ToastContainer } from 'react-toastify';

export const context = React.createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => {}]);


export default function App() {
  const [isConnected, setIsConnected] = useState(false);

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
      <ToastContainer />
      <Router>
          <div className='text-center'>
            {/* <Link className='btn btn-secondary' to={'/'}>Home</Link> */}
            {/* <Link className='btn btn-secondary  mx-2' to={'/download'}>Download</Link> */}
            {/* <Link className='btn btn-secondary' to={'/nodes'}>Nodes</Link> */}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nodes" element={<Nodes />} />
            {/* <Route path="/download" element={<Download />} /> */}
          </Routes>
      </Router>
      
    </context.Provider>
  );
}
