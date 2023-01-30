import React from 'react';

function Button({type, disabled, name}) {
    return (
        <button
            type={type}
            disabled={disabled}
        >
            {name}
        </button>
    );
}

export default Button;
