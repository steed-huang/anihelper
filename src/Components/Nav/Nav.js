import React, { useEffect } from "react";
import "./Nav.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { toggleLoginOn, updateName } from "../../Redux/Actions";
import { Link } from "react-router-dom";

const LOCAL_STORAGE_KEY = "anihelper.user ";

function Nav(props) {
  // retrieve user from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedUser) {
      props.onUpdateName(storedUser);
      console.log("user retrieved");
    }
  }, []);

  // store items to local storage
  useEffect(() => {
    if (props.name) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(props.name));
      console.log("user stored");
    }
  }, [props.name]);

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>
        <h2>
          <Link to="/">AniHelper</Link>
        </h2>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Button
          variant={props.name ? "success" : "warning"}
          size="lg"
          onClick={props.onToggleLoginOn}
        >
          {props.name ? props.name : "Not Signed In"}
        </Button>
      </Navbar.Collapse>
    </Navbar>
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
    onToggleLoginOn: () => dispatch(toggleLoginOn()),
    onUpdateName: (value) => dispatch(updateName(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
