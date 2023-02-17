import React, {useContext, useState} from 'react';
import './SignUp.css';
import {useForm} from 'react-hook-form'
import Input from "../../components/input/Input";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";

function SignUp() {

    const {setAuth} = useContext(AuthContext);

    // I choose for React Hook Form here cuz of easy validation
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    // I use useState to make sure I can put the error messages in the UI
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessage, setSuccesMessage] = useState("");

    // When sign up is successfully I want to redirect my user to private favourites page
    const navigate = useNavigate();

    // Async function to handle my axios post request to the backend
    async function handleFormSubmit(data) {
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: data.name,
                email: data.email,
                password: data.password,
                role: ["user"]
            })
            console.log(response.data.message);
            setSuccesMessage(response.data.message);
            reset();
            setTimeout(() => {
                navigate("/favourites")
            }, 2000)
            setAuth(true);

        } catch (e) {
            toggleError(true);
            console.error(e);
            setErrorMessage(e.response.data.message);
            reset();
        }
        toggleLoading(false);
    }

    return (
        <>
            <h1>Sign up</h1>

            <p>Please fill in your details below to be able to save favourites</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {/*I made a component from the input so I can re-use it*/}
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
                    inputType="email"
                    inputName="email"
                    inputId="email-field"
                    inputLabel="Email:"
                    validationRules={{
                        required: {
                            value: true,
                            message: "This field is required"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email must contain '@'"
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
                {/*Showing either the error or succes message in UI*/}
                {error && <p>{errorMessage}</p>}
                {!error && <p>{succesMessage}</p>}

                <Button
                    type="submit"
                    disabled={loading}
                >
                    Sign up
                </Button>

            </form>
        </>
    );
}

export default SignUp;
