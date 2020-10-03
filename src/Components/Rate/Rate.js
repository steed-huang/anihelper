import React, { useState, useEffect } from "react";
import "./Rate.css";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ShowList from "../ShowList";
import ValidUserModal from "../ValidUserModal";
import { updateAnimeList } from "../../Redux/Actions";

function Rate(props) {
  // for rating items
  const [anime_shows, setShows] = useState([
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
    {
      id: 1,
      name: "title",
      img: "img",
      rating: 50,
    },
  ]);

  // for valid user modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // check if error occurred and alert user
  useEffect(() => {
    if (props.listError === true) alert("Oops... something went wrong!");
  }, [props.listError]);

  return (
    <>
      {/* List Body */}
      <ShowList showList={anime_shows} />

      {/*Requiring Valid User Modal*/}
      <ValidUserModal show={show} handleClose={handleClose} />

      {/*Loading Overlay*/}
      {props.listLoading ? (
        <div id="modal_background">
          <div id="modal_spinner">
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
