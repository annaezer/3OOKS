import React from "react";
import styles from "./SearchTile.module.css"
import {Link} from "react-router-dom";

function SearchTile({title, description, link}) {
    return (
        <article className={styles["search-button"]}>
            <Link to={link}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </Link>
        </article>
    );
}

export default SearchTile;
