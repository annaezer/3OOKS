import React from "react";
import styles from "./SearchTile.module.css"
import {Link} from "react-router-dom";

function SearchTile({title, description, link}) {
    return (
        <article className={styles["search-button"]}>
            <Link to={link}>
                <p>{title}</p>
                <p>{description}</p>
            </Link>
        </article>
    );
}

export default SearchTile;
