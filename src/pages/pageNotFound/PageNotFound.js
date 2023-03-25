import React from "react";
import {useNavigate} from "react-router-dom";
import styles from "./PageNotFound.module.css";
import bookonhead from "../../assets/book on head horizontal.jpg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function PageNotFound() {

// Making sure the user is redirected automatically to the homepage when typing an unknown url
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/")
    }, 3000);

    return (
        <>
            <Header
                title="Page not found"
                img={bookonhead}
            />
            <main>
                <section>
                    <h2 className={styles["redirect-text"]}>You will be redirected in 3 seconds...</h2>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default PageNotFound;
