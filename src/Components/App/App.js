import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Login from "../Login";

function App(props) {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>AniHelper</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="light" onClick={props.onToggleLogin}>
            {props.name ? "Signed in as: " + props.name : "Not Signed In"}
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
    name: state.name.username,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleLogin: () => dispatch(toggleLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
