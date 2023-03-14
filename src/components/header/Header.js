import React from "react";
import styles from "./Header.module.css";

function Header({children, img, title}) {
    return (
        <header className="outer-container">
            <div className="inner-container {styles.test}">
                <img className={styles["header-image"]} src={img} alt={title}/>
                <div className={styles["header-text"]}>
                    <h1>{title}</h1>
                    {children}
                </div>
            </div>
        </header>
    );
}

export default Header;
