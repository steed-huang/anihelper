import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { Link } from "react-router-dom";

export default function FeatureCards() {
  return (
    <div id="deck-container">
      <CardDeck>
        <Card border="primary" bg="light">
          <Link to="/schedule">
            <Card.Img variant="top" src="http://placegoat.com/500/300" />
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
          <Link to="/recommend">
            <Card.Img variant="top" src="http://placegoat.com/500/300" />
          </Link>
          <Card.Body>
            <Card.Title>Recommendations</Card.Title>
            <Card.Text>Get reccomended anime to watch</Card.Text>
            <ul>
              <li>Based on your favourite & highest rated shows</li>
            </ul>
          </Card.Body>
        </Card>

        <Card border="primary" bg="light">
          <Link to="/search">
            <Card.Img variant="top" src="http://placegoat.com/500/300" />
          </Link>
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
  );
}
