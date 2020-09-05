import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";

function ValidUserModal({ show, handleClose, onToggleLogin }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Not Signed In</Modal.Title>
      </Modal.Header>
      <Modal.Body>You must provide a valid username to use this feature</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            handleClose();
            onToggleLogin();
          }}
        >
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleLogin: () => dispatch(toggleLogin()),
  };
};

export default connect(null, mapDispatchToProps)(ValidUserModal);
