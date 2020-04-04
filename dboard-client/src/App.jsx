import React from "react";
import "./styles/App.less";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import { Router, Redirect, Route } from "react-router-dom";
import { history } from "./helpers";
import { PrivateRoute } from "./components";

function App() {
  return (
    <div className="main-container">
      <Router history={history}>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/registration" component={AuthPage} />
        <Redirect from="*" to="/" />
      </Router>
    </div>
  );
}

export default App;
