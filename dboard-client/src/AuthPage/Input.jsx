import React, {Fragment, useState} from 'react';

export const Input = ({type, name, onChange, label, isValid}) => {
    const [showLabel, setShowLabel] = useState(false);

    function inputOnChange(e) {
        onChange(e);
        if (e.target.value !== "") {
            setShowLabel(true);
        } else {
            setShowLabel(false);
        }
    }

    return (
        <div className="input-group">
            <label className={'input-label ' + (showLabel ? 'shown-label' : 'hidden-label')}>{label}</label>
            <input type={type} name={name} onChange={inputOnChange} placeholder={label}
                   className={'input-field ' + (isValid ? 'invalid-input ' : '') + {}}/>
        </div>
    )
};