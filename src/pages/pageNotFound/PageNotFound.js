import React from "react";
import {useNavigate} from "react-router-dom";
import "./PageNotFound.css";
import bookonhead from "../../assets/book on head.jpg";
import Header from "../../components/header/Header";

function PageNotFound() {

// Making sure the user is redirected automatically to the homepage when typing an unknown url
    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/")
    }, 3000)

    return (
        <>
            <Header
                title="Page not found"
                img={bookonhead}
            />
            <main>
                <section>
                    <h2>You will be redirected in 3 seconds</h2>
                </section>
            </main>
        </>
    );
}

export default PageNotFound;
