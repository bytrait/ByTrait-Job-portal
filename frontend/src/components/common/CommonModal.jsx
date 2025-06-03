// components/CommonModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const CommonModal = ({ show, handleClose, title, children }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CommonModal;
