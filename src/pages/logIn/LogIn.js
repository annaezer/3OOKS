import React, {useContext, useState} from "react";
import styles from "./LogIn.module.css";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import bookbed from "../../assets/cabin horizontal.png";
import Quote from "../../components/quote/Quote";
import Footer from "../../components/footer/Footer";

// Making variable from my url
const LOGIN_API_URL = "https://frontend-educational-backend.herokuapp.com/api/auth/signin";

function LogIn() {
// I use React Hook Form again because I use it in Sign up and want to be consistent
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    // I use useState to make sure I can put the error messages in the UI
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    // I use the context to access the login function
    const {login} = useContext(AuthContext);

    // Create an asynchronic function for my POST request to the backend, which receives the data object from the React Hook Form to access the values from the input fields
    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.post(LOGIN_API_URL, {
                username: data.name,
                password: data.password
            })
            console.log(response);
            const token = response.data.accessToken;
            // Pass on my token to the Context
            login(token);
        } catch (e) {
            toggleError(true);
            console.error(e.response);
            // Use reset functionality from Hook Form so I can empty the fields for the user to try again
            reset();
        }
        toggleLoading(false);
    };

    return (
        <>
            {/*Re-using my Header component*/}
            <Header
                title="Log in"
                img={bookbed}
            />
            <main>
                <div className={styles["background-colour"]}>
                    <div className="outer-container">
                        <section className="inner-container">
                            <h2 className={styles.heading}>Fill in your username and password to log in</h2>
                            <p className={styles.subtext}>No account yet? Sign up <Link to="/signup">here!</Link></p>

                            {loading && <p className={styles.loading}>Loading...</p>}

                            {/*I use the method HandleSubmit from the Hook Form to be able to use all the functionality*/}
                            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                                {/*Using the Input component again for convenience*/}
                                <Input
                                    inputType="text"
                                    inputName="name"
                                    inputId="name-field"
                                    inputPlaceholder="Username"
                                    validationRules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Your name needs to be at least 6 characters"
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Your name can not be longer than 15 characters"
                                        }
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                <Input
                                    inputType="password"
                                    inputName="password"
                                    inputId="password-field"
                                    inputPlaceholder="Password"
                                    validationRules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Your password needs to be at least 6 characters"
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Your password can not be longer than 15 characters"
                                        }
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                {/*Showing the error message in UI*/}
                                {error &&
                                    <p className={styles["error-message"]}>This combination is not valid, please try
                                        again</p>}

                                <Button
                                    className={styles.button}
                                    type="submit"
                                >
                                    Log in
                                </Button>
                            </form>
                        </section>
                    </div>
                </div>
                <div className="outer-container">
                    <section className="inner-container">
                        {/*Re-using my Quote component*/}
                        <Quote
                            text="“If you don’t like to read, you haven’t found the right book.”"
                            author="- J.K. Rowling"
                        />
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default LogIn;
