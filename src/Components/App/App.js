import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { toggleLogin } from "../../Redux/Actions";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Login from "../Login";

function App(props) {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
          <h2>AniHelper</h2>
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

      {/* Tools CardDeck */}
      <div id="deck-container">
        <CardDeck>
          <Card border="primary" bg="light">
            <Card.Img variant="top" src="http://placegoat.com/500/300" />
            <Card.Body>
              <Card.Title>Schedule</Card.Title>
              <Card.Text>See what time seasonal anime are airing throughout the week</Card.Text>
              <ul>
                <li>Option to only display shows marked as "watching" by you</li>
              </ul>
            </Card.Body>
          </Card>
          <Card border="primary" bg="light">
            <Card.Img variant="top" src="http://placegoat.com/500/300" />
            <Card.Body>
              <Card.Title>Recommendations</Card.Title>
              <Card.Text>Get reccomended anime to watch</Card.Text>
              <ul>
                <li>Based on your favourite & highest rated shows</li>
              </ul>
            </Card.Body>
          </Card>
          <Card border="primary" bg="light">
            <Card.Img variant="top" src="http://placegoat.com/500/300" />
            <Card.Body>
              <Card.Title>Search</Card.Title>
              <Card.Text>Find shows through specific search parameters</Card.Text>
              <ul>
                <li>Option to only display shows not seen by you</li>
              </ul>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>

      {/* Login Modal */}
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
