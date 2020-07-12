import React from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";
import Button from "react-bootstrap/Button";
import Login from "../Login";

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          dispatch(toggleLogin());
        }}
      >
        Test Login
      </Button>
      <Login />
    </>
  );
}

export default App;
