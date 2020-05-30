import React, { useEffect } from "react";
import "./styles/App.less";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import { Router, Redirect, Route } from "react-router-dom";
import { history } from "./helpers";
import { PrivateRoute, Loader } from "./components";
import { userActions } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state) => state.authentication.loadingToken
  );
  useEffect(() => {
    dispatch(userActions.checkUserToken(dispatch));
  }, [dispatch]);
  return loadingStatus ? (
    <div className="loader-container">
      <Loader size="big" />
    </div>
  ) : (
    <div className="main-container">
      <Router history={history}>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/registration" component={AuthPage} />
        <Redirect from="*" to="/" />
      </Router>
    </div>
  );
}

export default App;
