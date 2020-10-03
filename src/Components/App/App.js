import React from "react";
import Nav from "../Nav";
import Login from "../Login";
import FeatureCards from "../FeatureCards";
import Recommend from "../Recommend";
import Schedule from "../Schedule";
import Rate from "../Rate";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      {/* Persistent */}
      <Nav />
      <Login />

      {/* Page Paths */}
      <Switch>
        <Route path="/" exact component={FeatureCards} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/rate" component={Rate} />
      </Switch>
    </Router>
  );
}

export default App;
