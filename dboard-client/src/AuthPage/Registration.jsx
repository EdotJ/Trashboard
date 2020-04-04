import {Form} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../actions/user.actions";
import {Loader, Button} from "../components";
import {Input} from "./Input";


const Registration = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const registering = useSelector(state => state.registration.registering);

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(user => ({...user, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.username && user.password && user.email && user.passwordConfirm) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
                <Input type="text" name="username" required onChange={handleChange} label="Username"
                       isValid={submitted && !user.username}/>
                <Input type="email" name="email" required onChange={handleChange} label="Email"
                       isValid={submitted && !user.email}/>
                <Input type="password" name="password" onChange={handleChange} label="Password"
                       isValid={submitted && !user.password}/>
                <Input type="password" name="passwordConfirm" onChange={handleChange} label="Confirm password"
                       isValid={submitted && !user.passwordConfirm}/>
            <Button type="primary" htmlType="submit" classes="loader-button">
                {registering ? <Loader size="small"/> : "Submit"}
            </Button>
        </form>
    );
};

export default Registration;