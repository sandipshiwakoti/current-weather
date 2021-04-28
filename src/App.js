import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useFetch } from "./useFetch";
import Home from "./components/Home";
import Weather from "./components/Weather";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/weather/:id">
            <Weather />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
