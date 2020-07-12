import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect, useDispatch } from "react-redux";
import { toggleLogin, updateName } from "../../Redux/Actions";

function Login({ login }) {
  const dispatch = useDispatch();
  const textInput = useRef(null);

  // updates username
  const handleLogin = () => {
    if (textInput.current.value.trim() !== "") {
      dispatch(updateName(textInput.current.value.trim()));
      dispatch(toggleLogin());
    }
  };

  return (
    <>
      <Modal show={login} onHide={() => dispatch(toggleLogin())} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter MAL Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl ref={textInput} />
            <InputGroup.Append>
              <Button variant="primary" onClick={() => handleLogin()}>
                Confirm
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(Login);
