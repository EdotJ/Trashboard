import React, {Fragment} from 'react';
import {Navbar} from "./Navbar";

export const Layout = ({children}) => {
    return (
        <Fragment>
            <Navbar/>
            {children}
        </Fragment>
    )
};