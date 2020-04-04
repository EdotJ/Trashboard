import React from "react";
import Login from "./Login";
import Registration from "./Registration";
import {useParams} from 'react-router-dom';


const UserForm = () => {
    let {id} = useParams();
    if (id === "login" || id.length === 0) {
        return <Login/>
    } else if (id === "registration") {
        return <Registration/>
    }
    return <Login/>
};

export default UserForm;