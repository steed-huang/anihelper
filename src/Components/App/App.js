import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../Redux/Actions";
import Button from "react-bootstrap/Button";

// currently just temp test stuff
function App() {
  const test = useSelector((state) => state.tool);
  const dispatch = useDispatch();

  return (
    <>
      <div>{test}</div>
      <Button variant="secondary" onClick={() => dispatch(increment(5))}>
        Add
      </Button>
    </>
  );
}

export default App;
