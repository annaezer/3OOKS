import React from 'react';
import './NavBar.css';
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/'>Home</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/about'>About</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/contact'>Contact</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/signup'>Sign up</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to='/login'>Log in</NavLink></li>
                    <span className="material-symbols-outlined"><NavLink to='/favourites'>favorite</NavLink></span>
                </ul>
                {/*<button type="button" onClick={()=> toggleAuth(false) + navigate("/")}>Log out</button>*/}
            </nav>
        </>
    );
}

export default NavBar;
