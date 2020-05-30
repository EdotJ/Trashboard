import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions/user.actions";
import { Button } from "../components/Button";
import { Loader } from "../components";
import { Input } from "./Input";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const loggingIn = useSelector((state) => state.authentication.loggingIn);

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        onChange={handleChange}
        label="Username"
        isValid={submitted && !username}
      />
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        label="Password"
        isValid={submitted && !password}
      />
      <Button type="primary" htmlType="submit" classes="loader-button">
        {loggingIn ? <Loader size="small" /> : "Sign in"}
      </Button>
    </form>
  );
};

export default Login;
