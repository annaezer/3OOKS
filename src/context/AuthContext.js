import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Creating Context to handle authentication throughout the whole app
export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    // useNavigate to make sure I can navigate users to the right page after logging in or logging out
    const navigate = useNavigate();

    //Make initial state with authentication on false, no user data and the status pending for the after mounting effect I use
    const [auth, setAuth] = useState({
        auth: false,
        user: null,
        status: "pending"
    });

    // Using an after mounting effect with empty dependency so I can handle users refreshing the page without being logged out
    useEffect(() => {
            // Get the token from the Local Storage
            const token = localStorage.getItem("token");
            // If there is a token call the getUserData function so the user key gets the right data again and the status and auth are being changed
            if (token) {
                const decoded = jwt_decode(token);
                console.log(decoded);
                // Also check if the token is still valid with this calculation method
                if (Math.floor(Date.now() / 1000) < decoded.exp) {
                    console.log("User is still logged in")
                    void getUserData(token);
                } else {
                    console.log("Token is expired")
                    localStorage.removeItem("token")
                }
                // If there is no token we don't change anything except for status otherwise it will be "Loading" instead of rendering app without authenticated user
            } else {
                setAuth({
                    auth: false,
                    user: null,
                    status: "done"
                })
            }
        }
        , [])

    // I receive the token from my POST request on the Log in page
    function logIn(token) {
        console.log("User is logged in");
        // I put the token in Local Storage
        localStorage.setItem("token", token);
        // When logged in I want to call the function getUserData to set authentication and user data and make sure the user gets redirected to Favourites page so I pass on token and redirect
        void getUserData(token, "/favourites");
    }

    async function getUserData(token, redirect) {
        try {
            // With the token from the logIn function I can do a GET request to the backend for the user data
            const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            // Put the data in the state
            setAuth({
                auth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    id: response.data.id
                },
                status: "done"
            })
            // If there is a redirect passed on - so only during log in - then redirect to Favourites page
            if (redirect) {
                navigate(redirect);
            }
        // If something goes wrong we want to log the error message and keep the state as is except for status so app gets rendered without authenticated user
        } catch (e) {
            console.error(e);
            setAuth({
                auth: false,
                user: null,
                status: "done"
            })
        }
    }

    function logOut() {
        console.log("User is logged out");
        // Remove the token and favourites out of the Local Storage
        localStorage.clear();
        setAuth({
            auth: false,
            user: null,
            status: "done"
        });
        // Navigate the user to the homepage
        navigate("/");
    }

    // This is the data object we want to pass on in the context so we can access it throughout the app
    const data = {
        ...auth,
        login: logIn,
        logout: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
