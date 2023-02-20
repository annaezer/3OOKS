import React, {useContext, useState} from "react";
import "./LogIn.css";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";

function LogIn() {
// I use React Hook Form again because I use it in Sign up and want to be consistent
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    // I use useState to make sure I can put the error messages in the UI
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // I use the context to access the login function
    const {login} = useContext(AuthContext);

    // Create an asynchronic function for my POST request to the backend, which receives the data object from the React Hook Form to access the values from the inputfields
    async function handleFormSubmit(data) {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
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
            setErrorMessage("This combination is not valid, please try again");
            // Use reset functionality from Hook Form so I can empty the fields for the user to try again
            reset();
        }
        toggleLoading(false);
    }

    return (
        <>
            <h1>Login</h1>
            <p>No account yet? Sign up <Link to="/signup">here</Link></p>

            {/*I use the method HandleSubmit from the Hook Form to be able to use all the functionality*/}
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {/*Using the Input component again for convenience*/}
                <Input
                    inputType="text"
                    inputName="name"
                    inputId="name-field"
                    inputLabel="Username:"
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
                    inputLabel="Password:"
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
                {error && <p>{errorMessage}</p>}


                <Button
                    type="submit"
                    disabled={loading}
                >
                    Log in
                </Button>

            </form>
        </>
    );
}

export default LogIn;
