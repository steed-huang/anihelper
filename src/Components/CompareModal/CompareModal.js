import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CompareModal.css";

export default function CompareModal({ show, handleClose, shows, randomize }) {
  // calcuates rating change for match (from easyrate)
  const getRatingChange = (r1, r2, result) => {
    // generic elo calculations
    // transformed rating
    const TR1 = Math.pow(10, parseFloat(r1) / 400);
    const TR2 = Math.pow(10, parseFloat(r2) / 400);
    // expected scores
    const E1 = parseFloat(TR1) / (parseFloat(TR1) + parseFloat(TR2));
    const E2 = parseFloat(TR2) / (parseFloat(TR1) + parseFloat(TR2));
    // score
    let S1, S2;
    if (result === 0) {
      // item one won
      S1 = 1;
      S2 = 0;
    } else if (result === 1) {
      // item two won
      S1 = 0;
      S2 = 1;
    } else if (result === 0.5) {
      // tie
      S1 = 0.5;
      S2 = 0.5;
    }

    // K factor (max rating change)
    const K = 32;

    // new elo rating
    let NR1 = parseFloat(r1) + parseFloat(K) * (parseFloat(S1) - parseFloat(E1));
    let NR2 = parseFloat(r2) + parseFloat(K) * (parseFloat(S2) - parseFloat(E2));

    // add calculations later
    return [NR1, NR2];
  };

  // handle rating event
  const handleRating = (result) => {
    let [newRating1, newRating2] = getRatingChange(shows[0].rating, shows[1].rating, result);

    // bounds
    if (newRating1 > 100) newRating1 = 100;
    else if (newRating1 < 10) newRating1 = 10;
    if (newRating2 > 100) newRating2 = 100;
    else if (newRating2 < 10) newRating2 = 10;

    shows[0].rating = newRating1;
    shows[1].rating = newRating2;
    randomize();
  };

  return (
    <>
      {show ? (
        <Modal show={show} onHide={handleClose} size="lg" keyboard={false}>
          <Modal.Header>
            <Modal.Title id="rate_title">Which is better?</Modal.Title>
          </Modal.Header>
          <Modal.Body id="rate_container">
            {/*Comparing Options*/}

            {/*Anime 0*/}
            <Card className="anime-card" border="secondary" key={shows[0].id}>
              <Card.Header title={shows[0].name} as="h6">
                <div className="anime-title">{shows[0].name}</div>
              </Card.Header>
              <img
                className="card-img"
                src={shows[0].img}
                alt="Cover"
                onClick={() => handleRating(0)}
              />
              <Card.Footer>
                <small className="text-muted">Current Rating: {shows[0].rating.toFixed(1)}</small>
              </Card.Footer>
            </Card>

            {/*Draw*/}
            <Button onClick={() => handleRating(0.5)} id="draw_but">
              DRAW
            </Button>

            {/*Anime 1*/}
            <Card className="anime-card" border="secondary" key={shows[1].id}>
              <Card.Header title={shows[1].name} as="h6">
                <div className="anime-title">{shows[1].name}</div>
              </Card.Header>
              <img
                className="card-img"
                src={shows[1].img}
                alt="Cover"
                onClick={() => handleRating(1)}
              />
              <Card.Footer>
                <small className="text-muted">Current Rating: {shows[1].rating.toFixed(1)}</small>
              </Card.Footer>
            </Card>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
