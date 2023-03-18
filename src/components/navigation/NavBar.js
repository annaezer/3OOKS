import React, {useContext, useState} from "react";
import styles from "./NavBar.module.css";
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import {ReactComponent as Logo} from "../../assets/logo 3ooks.svg";

function NavBar() {
    // For conditional showing of "log in" and "sign up" when authentication is false, and "favourites" and "log out button" when authentication is true I need useContext
    const {auth, user, logout} = useContext(AuthContext);
    console.log(auth);

    // Creating state and function for fold out menu when screen size changes
    const [mobileMenu, toggleMobileMenu] = useState(false);

    function showMobileMenu() {
        toggleMobileMenu(prev => !prev);
    }

    return (
        <div className="outer-container">
            <nav className={styles["nav-bar"]}>
                {/*Creating the icons with display on toggle mode*/}
                <button className={styles["toggle-menu"]} type="button" onClick={showMobileMenu}>
                    {!mobileMenu ? <span className="material-symbols-outlined">menu</span>
                        : <span className="material-symbols-outlined">close</span>
                    }
                </button>
                {/*Using the logo as a svg so you can zoom in or out without problems, plus using Link to make sure the user can always get back to the homepage by clicking on it as this is quite standard*/}
                <Link to="/"><Logo className={styles.logo}/></Link>
                {auth && <span className={styles["welcome-text"]}>Welcome {user.username}!</span>}
                {/*Creating 2 different classNames so I can change the style when mobile*/}
                <ul className={mobileMenu ? styles["mobile-options"] : styles["menu-options"]}>
                    {/*I use NavLink to be able to style them when active*/}
                    <li><NavLink
                        className={({isActive}) => isActive ? styles["active-menu-link"] : styles["default-menu-link"]}
                        to="/about">About</NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? styles["active-menu-link"] : styles["default-menu-link"]}
                        to="/contact">Contact</NavLink></li>
                    {!auth ?
                        <>
                            <li><NavLink
                                className={({isActive}) => isActive ? styles["active-menu-link"] : styles["default-menu-link"]}
                                to="/signup">Sign up</NavLink></li>
                            <li><NavLink
                                className={({isActive}) => isActive ? styles["active-menu-link"] : styles["default-menu-link"]}
                                to="/login">Log in</NavLink></li>
                        </>
                        :
                        <>
                            <NavLink
                                className={({isActive}) => isActive ? styles["active-menu-link"] : styles["default-menu-link"]}
                                to="/favourites"><span className="material-symbols-outlined">favorite</span></NavLink>
                            <Button
                                type="button"
                                clickHandler={() => logout()}
                            >
                                Log out
                            </Button>
                        </>
                    }
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
