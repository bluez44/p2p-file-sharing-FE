import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import axios from '../api';

function MyModal({ name, id}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios.get('/posts/').then((response) => {
          setInformation(response.data);
        });
  }, [])

  return (
    <>
      <div className='more-info d-flex justify-content-center align-items-center' onClick={handleShow}>
          <Icon icon="ic:round-search" />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{name} - {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{maxHeight: '300px', overflow: 'auto', fontSize: '12px'}}>
            {information.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;