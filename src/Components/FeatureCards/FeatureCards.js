import React from "react";
import "./FeatureCards.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { Link } from "react-router-dom";

export default function FeatureCards() {
  return (
    <>
      <div id="deck-container">
        <CardDeck>
          <Card border="primary" bg="light">
            <Link to="/schedule" className="card-img-a">
              <div className="card-img">
                <img className="card-icon" src={require("../../Assets/calendar.svg")} alt="img" />
              </div>
            </Link>
            <Card.Body>
              <Card.Title>Schedule</Card.Title>
              <Card.Text>See what time seasonal anime are airing throughout the week</Card.Text>
              <ul>
                <li>Option to only display shows marked as "watching" by you</li>
              </ul>
            </Card.Body>
          </Card>

          <Card border="primary" bg="light">
            <Link to="/recommend" className="card-img-a">
              <div className="card-img">
                <img className="card-icon" src={require("../../Assets/stars.svg")} alt="img" />
              </div>
            </Link>
            <Card.Body>
              <Card.Title>Recommendations</Card.Title>
              <Card.Text>Get recommended anime to watch</Card.Text>
              <ul>
                <li>Based on your favourite & highest rated shows</li>
              </ul>
            </Card.Body>
          </Card>

          <Card border="primary" bg="light">
            <Link to="/list" className="card-img-a">
              <div className="card-img">
                <img className="card-icon" src={require("../../Assets/list.svg")} alt="img" />
              </div>
            </Link>
            <Card.Body>
              <Card.Title>List</Card.Title>
              <Card.Text>See a styled list of all your anime</Card.Text>
              <ul>
                <li>TBD Features</li>
              </ul>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>

      <div id="credit">
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  );
}
