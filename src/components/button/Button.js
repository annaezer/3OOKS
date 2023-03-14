import React from "react";
import styles from "./Button.module.css";

function Button({type, disabled, children, className, clickHandler}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={className}
            onClick={clickHandler}
        >
            {children}
        </button>
    );
}

export default Button;
