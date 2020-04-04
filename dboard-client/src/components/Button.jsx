import React from 'react';

export const Button = (props) => {
    const {type, htmlType, children, classes} = props;
    return (
        <button type={htmlType} className={`btn ${type && `button-${type}`} ${classes}`}>{children}</button>
    )
};