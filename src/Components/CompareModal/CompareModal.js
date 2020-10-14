import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./CompareModal.css";

export default function CompareModal({ show, handleClose }) {
  return (
    <>
      {show ? (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Which is better?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => {}} id="left_but">
              Left
            </Button>
            <Button onClick={() => {}} id="draw_but">
              Draw
            </Button>
            <Button onClick={() => {}} id="right_but">
              Right
            </Button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
