import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);

    function logIn(token) {
        console.log("User is logged in");
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        setAuth(true);
        setTimeout(() => {
            navigate("/favourites")
        }, 1000)
    }

    function logOut() {
        console.log("User is logged out");
        localStorage.removeItem('token');
        setAuth (false);
        navigate('/');
    }

    const data = {
        auth: auth,
        setAuth: setAuth,
        login: logIn,
        logout: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
