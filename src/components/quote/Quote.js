import React from 'react';

function Quote({text, author}) {
    return (
        <div>
            <h3>{text}</h3>
            <h3>{author}</h3>
        </div>
    );
}

export default Quote;
