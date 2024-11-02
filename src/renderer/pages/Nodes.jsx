import React, { useEffect, useState, useContext } from 'react';
import Content from '../components/Content';
import { Link } from 'react-router-dom';

function Nodes() {
  const [nodes, setNodes] = useState(
    [
        {
            id: 1,
            ip: '132.193.1.1',
            port: 80,
            fileCount: 2
        },
        {
            id: 2,
            ip: '132.193.1.1',
            port: 123,
            fileCount: 3
        }
    ]);

//   useEffect(() => {
//     axios.get('/tracker/get-peers').then((response) => {
//       setNodes(response.data);
//     });
//   }, []);

  return (
    <Content>
        <h2>Trạng thái các Node</h2>
        <Link className='link mb-4' to={'/'}>Danh sách các tệp có thể tải</Link>
        <ul className='list-group list flex-grow-1'>
            {nodes.map((node) => (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={node.id}>
                <span>Node: {node.ip} : {node.port}</span>
                <span>Số lượng tệp: {node.fileCount}</span>
            </li>
            ))}
        </ul>
    </Content>
  );
}

export default Nodes;
