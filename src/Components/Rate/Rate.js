import React, { useState, useEffect } from "react";
import "./Rate.css";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ShowList from "../ShowList";
import Button from "react-bootstrap/Button";
import ValidUserModal from "../ValidUserModal";
import CompareModal from "../CompareModal";
import { updateAnimeList } from "../../Redux/Actions";

function Rate(props) {
  // for rating items
  const [anime_shows, setShows] = useState(null);

  // for valid user modal
  const [userShow, setUserShow] = useState(false);
  const handleUserClose = () => setUserShow(false);
  const handleUserShow = () => setUserShow(true);

  // for comparing modal
  const [compShow, setCompShow] = useState(true);
  const handleCompClose = () => setCompShow(false);
  const handleCompShow = () => setCompShow(true);

  // check if error occurred and alert user
  useEffect(() => {
    if (props.listError === true) alert("Oops... something went wrong!");
  }, [props.listError]);

  // load anime into list
  var handleLoadItems = () => {
    props.onUpdateAnimeList();
  };

  // update anime shows list
  useEffect(() => {
    if (props.userdata.completed) {
      let new_shows = [];
      props.userdata.completed.forEach((anime) => {
        // give shows their user rated score
        // if no score, default 50
        let rating = anime.score ? anime.score * 10 : 50;
        new_shows.push({
          id: anime.id,
          name: anime.title,
          img: anime.image_url,
          rating: rating,
        });
      });

      new_shows.sort((a, b) => {
        return b.rating - a.rating;
      });

      setShows(new_shows);
    }
  }, [props.userdata.completed]);

  return (
    <>
      {/* List Body */}
      <ShowList showList={anime_shows} />

      <div id="buttons_div">
        {anime_shows ? (
          <Button className="func_buttons" size="lg" variant="success" onClick={() => {}}>
            Start Rating
          </Button>
        ) : (
          <Button
            className="func_buttons"
            size="lg"
            onClick={() => {
              if (props.name) {
                handleLoadItems();
              } else handleUserShow();
            }}
          >
            Load Anime
          </Button>
        )}

        <Button onClick={() => {}} className="func_buttons">
          Reset Ratings
        </Button>
      </div>

      {/* Anime Comparing Modal */}
      <CompareModal show={compShow} handleClose={handleCompClose} />

      {/*Requiring Valid User Modal*/}
      <ValidUserModal show={userShow} handleClose={handleUserClose} />

      {/*Loading Overlay*/}
      {props.listLoading ? (
        <div className="modal_background">
          <div className="modal_spinner">
            <Spinner animation="border" variant="light" size="lg" />{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    name: state.name.username,
    userdata: state.userdata,
    listLoading: state.userdata.loading,
    listError: state.userdata.error,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAnimeList: () => dispatch(updateAnimeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
