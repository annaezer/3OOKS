import React from "react";
import "./Header.css";

function Header({children, img, title}) {
    return (
        <header>
            <h1>{title}</h1>
            <img className="header-image" src={img} alt={title}/>
            {children}
        </header>
    );
}

export default Header;
