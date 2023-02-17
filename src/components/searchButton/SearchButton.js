import React from "react";
import "./SearchButton.css"

function SearchButton({title, description}) {
    return (
        <article className="search-button">
            <p>{title}</p>
            <p>{description}</p>
        </article>
    );
}

export default SearchButton;
