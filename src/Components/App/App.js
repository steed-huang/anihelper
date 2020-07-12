import React from "react";
import "./App.css";
import { connect, useDispatch } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Login from "../Login";

function App({ name }) {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>AniHelper</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="light" onClick={() => dispatch(toggleLogin())}>
            {name ? "Signed in as: " + name : "Not Signed In"}
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Login />
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    name: state.name,
  };
};

export default connect(mapStateToProps)(App);
