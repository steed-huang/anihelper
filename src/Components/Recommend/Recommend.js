import React from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { updateAnimeList, toggleLogin } from "../../Redux/Actions";

function Recommend(props) {
  return (
    <>
      <Button
        onClick={() => {
          console.log(props.userdata);
        }}
        variant="success"
      >
        Get Suggestions
      </Button>
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    userdata: state.userdata,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAnimeList: () => dispatch(updateAnimeList()),
    onToggleLogin: () => dispatch(toggleLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
