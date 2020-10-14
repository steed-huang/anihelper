import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CompareModal.css";

export default function CompareModal({ show, handleClose, shows, randomize }) {
  return (
    <>
      {show ? (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Which is better?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                onClick={() => randomize()}
              />
              <Card.Footer>
                <small className="text-muted">Current Rating: {shows[0].rating}</small>
              </Card.Footer>
            </Card>

            {/*Draw*/}
            <Button onClick={() => randomize()} id="draw_but">
              Draw
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
                onClick={() => randomize()}
              />
              <Card.Footer>
                <small className="text-muted">Current Rating: {shows[1].rating}</small>
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
