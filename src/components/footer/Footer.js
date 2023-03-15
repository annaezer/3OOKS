import React from "react";
import styles from "./Footer.module.css";

function Footer() {

    // Creating variable to make sure the year changes automatically
    const today = new Date();

    return (
        <span className={styles.footer}>Book application 3OOKS &copy; {today.getFullYear()}</span>
    );
}

export default Footer;
