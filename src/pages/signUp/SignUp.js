import React, {useState} from "react";
import styles from "./SignUp.module.css";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import bookhead from "../../assets/book in front of head.jpg";
import Quote from "../../components/quote/Quote";
import Footer from "../../components/footer/Footer";

// Making variable from my url
const SIGNUP_API_URL = "https://frontend-educational-backend.herokuapp.com/api/auth/signup";

function SignUp() {

    // I choose for React Hook Form here because of easy validation
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    // I use useState to make sure I can put the error messages in the UI
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessage, setSuccesMessage] = useState("");

    // When sign up is successfully I want to redirect my user to log in page
    const navigate = useNavigate();

    // Async function to handle my axios POST request to the backend, which receives the data object from the React Hook Form to access the values from the inputfields
    async function handleFormSubmit(data) {
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.post(SIGNUP_API_URL, {
                username: data.name,
                email: data.email,
                password: data.password,
                role: ["user"]
            });
            console.log(response);
            setSuccesMessage(response.data.message);
            // Use reset functionality from Hook Form so I can empty the fields for the user to see something is happening
            reset();
            // The time out on 2 seconds so user can read success message and then gets redirected automatically
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        } catch (e) {
            toggleError(true);
            console.error(e);
            setErrorMessage(e.response.data.message);
            reset();
        }
        toggleLoading(false);
    };

    return (
        <>
            {/*Re-using my Header component*/}
            <Header
                title="Sign up"
                img={bookhead}
            />
            <main>
                <div className={styles["background-colour"]}>
                    <div className="outer-container">
                        <section className="inner-container">
                            <h2 className={styles.heading}>Create your account and start
                                saving favourites!</h2>
                            <p className={styles.subtext}>Already an account? Log in <Link to="/login">here!</Link></p>

                            {loading && <p className={styles.loading}>Loading...</p>}

                            {/*Use the method HandleSubmit from the Hook Form to be able to use all the functionality*/}
                            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                                {/*I made a component from the input so I can re-use it*/}
                                <Input
                                    labelText="Username"
                                    inputType="text"
                                    inputName="name"
                                    inputId="name-field"
                                    inputPlaceholder="Choose your own username"
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
                                    labelText="Email"
                                    inputType="email"
                                    inputName="email"
                                    inputId="email-field"
                                    inputPlaceholder="Fill in your email-address"
                                    validationRules={{
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        // Using RegEx pattern for checking the special symbol @
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Email must contain '@'"
                                        }
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                <Input
                                    labelText="Password"
                                    inputType="password"
                                    inputName="password"
                                    inputId="password-field"
                                    inputPlaceholder="Choose your own password"
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

                                {/*Showing either the error or succes message in UI*/}
                                {error && <p className={styles["error-message"]}>{errorMessage}</p>}
                                {!error && <p className={styles["succes-message"]}>{succesMessage}</p>}

                                <Button
                                    className={styles.button}
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </form>
                        </section>
                    </div>
                </div>
                <div className="outer-container">
                    <section className="inner-container">
                        {/*Because I repeat the quote section on a few pages I created a component*/}
                        <Quote
                            text="“Until I feared I would lose it, I never loved to read. One does not love breathing.”"
                            author="- Harper Lee"
                        />
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default SignUp;
