import React from "react";
import styles from "./Header.module.css";

function Header({children, img, title}) {
    return (
        <header className="outer-container">
            <div className={styles["inner-container-header"]}>
                <div className={styles["image-container"]}>
                    <img className={styles["header-image"]} src={img} alt={title}/>
                    <div className={styles.rectangle}></div>
                </div>
                <div className={styles["header-text"]}>
                    <h1 className={styles.heading}>{title}</h1>
                    {children}
                </div>
            </div>
        </header>
    );
}

export default Header;
