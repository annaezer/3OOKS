import React, {useContext} from "react";
import "./NavBar.css";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";

function NavBar() {
    // For conditional showing of log in and sign up when authentication is false and favourites and log out when authentication is true I need useContext
    const {auth, user, logout} = useContext(AuthContext);
    console.log(auth);

    return (
        <>
            <nav>
                <ul>
                    {/*I use NavLink to be able to style them when active*/}
                    <li><NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                 to="/">Home</NavLink></li>
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
                            <span className="material-symbols-outlined"><NavLink
                                to="/favourites">favorite</NavLink></span>
                            <Button
                                type="button"
                                clickHandler={() => logout()}
                            >
                                Log out
                            </Button>
                            <p>Welcome {user.username} this is your email: {user.email} and this is your
                                id:{user.id}</p>
                        </>
                    }
                </ul>
            </nav>
        </>
    );
}

export default NavBar;
