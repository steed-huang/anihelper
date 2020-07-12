import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";

export default function Login() {
  const dispatch = useDispatch();
  const textInput = useRef(null);

  return (
    <>
      <Modal
        show={useSelector((state) => state.login)}
        onHide={() => dispatch(toggleLogin())}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter MAL Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl ref={textInput} />
            <InputGroup.Append>
              <Button variant="primary" onClick={() => console.log(textInput.current.value)}>
                Confirm
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
