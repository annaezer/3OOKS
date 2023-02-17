import React from "react";
import {useNavigate} from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {

// Making sure the user is redirected automatically to the homepage when typing an unknown url
    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/")
    }, 3000)

    return (
        <>
            <h1>Page not found | 404</h1>
            <p>You will be redirected in 3 sec.</p>
        </>
    );
}

export default PageNotFound;
