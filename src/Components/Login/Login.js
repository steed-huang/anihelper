import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import { toggleLogin, updateName } from "../../Redux/Actions";

function Login(props) {
  // ref to username input
  const textInput = useRef(null);

  // updates username
  const handleLogin = () => {
    if (textInput.current.value.trim() !== "") {
      props.updateNam(textInput.current.value.trim());
      props.toggleLog();
    }
  };

  return (
    <>
      <Modal show={props.login} onHide={props.toggleLog} backdrop="static" keyboard={false}>
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

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLog: () => dispatch(toggleLogin()),
    updateNam: (value) => dispatch(updateName(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
