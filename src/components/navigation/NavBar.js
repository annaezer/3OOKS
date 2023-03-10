import React, {useContext} from "react";
import "./NavBar.css";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import {ReactComponent as Logo} from "../../assets/logo 3ooks.svg";

function NavBar() {
    // For conditional showing of "log in" and "sign up" when authentication is false, and "favourites" and "log out button" when authentication is true I need useContext
    const {auth, user, logout} = useContext(AuthContext);
    console.log(auth);

    return (
        <nav className="nav-bar">
            {/*<span className="logo">3ooks</span>*/}
            <Logo/>
            <ul className="menu-options">
                {auth && <span className="welcome-text">Welcome {user.username}!</span>}
                {/*I use NavLink to be able to style them when active*/}
                <li><NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                             to="/about">About</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                             to="/contact">Contact</NavLink></li>
                {!auth ?
                    <>
                        <li><NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                     to="/signup">Sign up</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                     to="/login">Log in</NavLink></li>
                    </>
                    :
                    <>
                        <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"} to="/favourites"><span className="material-symbols-outlined">favorite</span></NavLink>
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
    );
}

export default NavBar;
