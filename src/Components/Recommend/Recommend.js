import React, { useState } from "react";
import "./Recommend.css";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { updateAnimeList } from "../../Redux/Actions";
import ValidUserModal from "../ValidUserModal";

function Recommend(props) {
  // determines anime to be recommended
  const getRecommend = () => {
    console.log(1);
  };

  // for valid user modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/*Info Div*/}
      <div id="info_div">
        <h1>Recommender</h1>
        <div>Determines recommendations based on your favourite/highest rated shows</div>
        <Button
          onClick={() => {
            if (props.name) {
              getRecommend();
            } else handleShow();
          }}
          variant="success"
        >
          Get Recommendations
        </Button>
      </div>

      {/*Requiring Valid User Modal*/}
      <ValidUserModal show={show} handleClose={handleClose} />
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    name: state.name.username,
    userdata: state.userdata,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAnimeList: () => dispatch(updateAnimeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
