import React from "react";
import "./Nav.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";
import { Link } from "react-router-dom";

function Nav(props) {
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
          onClick={props.onToggleLogin}
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
    onToggleLogin: () => dispatch(toggleLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
