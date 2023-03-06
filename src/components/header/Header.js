import React from 'react';

function Header({children, img, title}) {
    return (
        <header>
            <h1>{title}</h1>
            <img src={img} alt={title}/>
        {children}
        </header>
    );
}

export default Header;
