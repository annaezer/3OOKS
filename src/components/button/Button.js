import React from "react";
import "./Button.module.css";

// I cant use the styles cuz it conflicts with other styles in nav component

function Button({type, children, clickHandler, className}) {
    return (
        <button
            className={className}
            type={type}
            onClick={clickHandler}
        >
            {children}
        </button>
    );
}

export default Button;
