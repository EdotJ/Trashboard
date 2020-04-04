import React, {useState} from 'react';

export const Burger = ({onClick}) => {
    const [isOpen, setIsOpen] = useState(false);

    const overrideOnClick = () => {
        setIsOpen(!isOpen);
        onClick();
    };

    return (
        <div className="burger-container" onClick={overrideOnClick}>
            {isOpen ?
                <svg height="40" width="40" className="burger-exit">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
                :
                <svg viewBox="0 0 100 80" width="40" height="40" className="burger-enter">
                    <rect width="100" height="15" rx="5"></rect>
                    <rect y="30" width="100" height="15" rx="5"></rect>
                    <rect y="60" width="100" height="15" rx="5"></rect>
                </svg>
            }
        </div>
    )
}