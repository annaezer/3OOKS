import React, {useState} from 'react';
import './SignUp.css';
import {useForm} from 'react-hook-form'
import InputComponent from "../../components/input/InputComponent";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SignUp() {
    // I choose for React Hook Form here cuz of easy validation

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] =useState("");
    const [succesMessage, setSuccesMessage] =useState("");
    const navigate = useNavigate();

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
            setTimeout(()=>{
                navigate("/login")
            }, 2000)

        } catch (e) {
            toggleError(true);
            console.error(e);
            setErrorMessage(e.response.data.message);
        }
        toggleLoading(false);
    }

    return (
        <>
            <h1>Sign up</h1>

            <p>Please fill in your details below to be able to save favourites</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <InputComponent
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

                <InputComponent
                    inputType="email"
                    inputName="email"
                    inputId="email-field"
                    inputLabel="Email:"
                    validationRules={{
                        required: {
                            value: true,
                            message: "This field is required"
                        },
                        validate: (value) => value.includes('@') || "Email must contain '@'",
                    }}
                    register={register}
                    errors={errors}
                />

                <InputComponent
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

                {error && <p>{errorMessage}</p>}
                {!error && <p>{succesMessage}</p>}

                <button type="submit" disabled={loading}>Sign up</button>

            </form>
        </>
    );
}

export default SignUp;
