import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

function ModalF({children, classBtn, btnColor, buttonTitle, title, status, centered = false}){
  const [ modal, setModal ] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color={btnColor} className={classBtn} disabled={status} onClick={toggle}>
        {buttonTitle}
      </Button>
      <Modal
      centered={centered}
      isOpen={modal}
      toggle={toggle}
      backdrop="static"
      keyboard={true}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
          {' '}
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalF;