import React, { useEffect, useState } from "react";
import "./Schedule.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { updateSchedule, updateAnimeList, toggleLogin } from "../../Redux/Actions";

function Schedule(props) {
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  // whether to only display users "watching" shows
  const [userOnly, setUserOnly] = useState(false);

  // for watching toggle error modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update days array
  useEffect(() => {
    const cur_day = new Date().getDay();
    // order starting from current day of week
    let new_days = [...days.slice(cur_day), ...days.slice(0, cur_day)];
    setDays(new_days);
    props.onUpdateSchedule();
  }, []);

  // check if error occurred and alert user
  useEffect(() => {
    if (props.scheduleError === true || props.listError === true)
      alert("Oops... something went wrong!");
  }, [props.scheduleError, props.listError]);

  // update if username changes while "watching" is on
  useEffect(() => {
    if (userOnly) {
      props.onUpdateAnimeList();
    }
  }, [props.name]);

  return (
    <>
      {/*Toggle Button*/}
      <div id="watching-toggle">
        <h5 className="toggle-component">Only display "watching" shows:</h5>
        <ButtonGroup className="toggle-component" id="toggle_btn" toggle>
          <ToggleButton
            type="radio"
            variant="secondary"
            checked={userOnly}
            onChange={() => {
              if (!userOnly) {
                if (props.name) {
                  props.onUpdateAnimeList();
                  setUserOnly(true);
                } else handleShow();
              }
            }}
          >
            ON
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="secondary"
            checked={!userOnly}
            onChange={() => {
              if (userOnly) {
                setUserOnly(false);
              }
            }}
          >
            OFF
          </ToggleButton>
        </ButtonGroup>
      </div>

      {/*Anime Display Rows*/}
      <div id="week_container">
        {days.map((day) => {
          // cards to be drawn in the respective day
          let cards = [];

          // if shows state exists (api request completed), determine which shows to be drawn
          if (props.shows) {
            props.shows[day].forEach((anime) => {
              // whether this anime card is getting drawn
              let draw = true;

              // if user wants to only see watching anime
              if (props.watching && userOnly) {
                draw = false;

                // check if the anime is on users watching list
                props.watching.forEach((watching_anime) => {
                  if (anime.title === watching_anime.title) {
                    draw = true;
                  }
                });
              }

              if (draw) {
                cards.push(
                  <Card className="anime-card" border="secondary" key={anime.title}>
                    <Card.Header title={anime.title} as="h6">
                      <div className="anime-title">{anime.title}</div>
                    </Card.Header>
                    <a className="image-div" href={anime.url} target="_blank">
                      <img className="card-img" src={anime.image_url} alt="Cover" />
                    </a>
                    <Card.Footer>
                      <small className="text-muted">{anime.airing_start}</small>
                    </Card.Footer>
                  </Card>
                );
              }
            });
          }

          // draw day of week if cards to be drawn is not empty
          if (cards.length) {
            return (
              <div className="day-container" key={day}>
                <div className="day-title">
                  <h2>{day}</h2>
                </div>
                <div className="anime-container">{cards.map((card) => card)}</div>
              </div>
            );
          } else return null;
        })}
      </div>

      {/*Loading Overlay*/}
      {props.scheduleLoading || props.listLoading ? (
        <div id="modal_background">
          <div id="modal_content">
            <Spinner animation="border" variant="light" size="lg" />
          </div>
        </div>
      ) : (
        ""
      )}

      {/*Watching Toggle Error*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Not Signed In</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must provide a valid username to use this feature</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              props.onToggleLogin();
            }}
          >
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    name: state.name.username,
    shows: state.schedule.days,
    watching: state.userdata.watching,
    scheduleLoading: state.schedule.loading,
    listLoading: state.userdata.loading,
    scheduleError: state.schedule.error,
    listError: state.userdata.error,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSchedule: () => dispatch(updateSchedule()),
    onUpdateAnimeList: () => dispatch(updateAnimeList()),
    onToggleLogin: () => dispatch(toggleLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
