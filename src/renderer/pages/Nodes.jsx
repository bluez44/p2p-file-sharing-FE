import React, { useEffect, useState, useContext } from 'react';
import Content from '../components/Content';
import { Link } from 'react-router-dom';
import { peersContext } from '../App';

function Nodes() {
  const [nodes, setNodes] = useContext(peersContext)

//   useEffect(() => {
//     axios.get('/tracker/get-peers').then((response) => {
//       setNodes(response.data);
//     });
//   }, []);

    console.log(nodes[0][0])

  return (
    <Content>
        <h2>Trạng thái các Node</h2>
        <Link className='link mb-4' to={'/fileList'}>Danh sách các tệp có thể tải</Link>
        <ul className='list-group list flex-grow-1'>
            {nodes.map((node, index) => (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
                <span>Node: {node[0].ip} : {node[0].port}</span>
            </li>
            ))}
        </ul>
    </Content>
  );
}

export default Nodes;
