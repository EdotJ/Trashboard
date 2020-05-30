import Grid from "antd/es/card/Grid";
import { Col, Row } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import UserForm from "./UserForm";
import Login from "./Login";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../helpers";
import { alertActions } from "../actions";
import { Alert } from "../components";

function AuthPage() {
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <Grid className="auth-grid">
      <Row className="full-height">
        <Col
          xs={{ span: 24 }}
          lg={{ span: 6 }}
          xl={{ span: 5 }}
          className="login-sider full-height"
        >
          <div className="form-container">
            <h1 className="login-text">
              <Link to="/login" className="login-link">
                Login
              </Link>
              <p className="login-slash">&nbsp;/&nbsp;</p>
              <Link to="/registration" className="login-link">
                Sign up
              </Link>
            </h1>
            {alert && <Alert message={alert.message} type={alert.type} />}
            <Switch>
              <Route path="/:id" children={<UserForm />} />
              <Login />
            </Switch>
          </div>
        </Col>
        <Col flex="auto" xs={{ span: 0 }} lg={{ span: 19 }}>
          <img
            className="login-mountains"
            src="/mountains.jpg"
            alt="Chilly mountains"
          />
        </Col>
      </Row>
    </Grid>
  );
}

export default AuthPage;
