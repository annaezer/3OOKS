import React from "react";
import "./SearchButton.css"
import {Link} from "react-router-dom";

function SearchButton({title, description, link}) {
    return (
        <article className="search-button">
            <Link to={link}>
                <p>{title}</p>
            <p>{description}</p>
            </Link>
        </article>
    );
}

export default SearchButton;
