import React from "react";
import styles from "./Quote.module.css";

function Quote({text, author}) {
    return (
        <>
            <h2 className={styles["quote-text"]}>{text}</h2>
            <h2 className={styles["quote-text"]}>{author}</h2>
        </>
    );
}

export default Quote;
