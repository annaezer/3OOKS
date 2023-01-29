import React from 'react';
import './SignUp.css';
import {useForm} from 'react-hook-form'
import InputComponent from "../../components/InputComponent";

function SignUp() {
    // I choose for React Hook Form here cuz of easy validation

    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
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

                <button type="submit">Sign up</button>

            </form>
        </>
    );
}

// Wanneer je een gebruiker probeert te registreren met een username die al bestaat, krijg je een foutcode. De details over deze foutmelding vindt je in e.response.
//     Indien de registratie succesvol was, ontvang je een succesmelding.

export default SignUp;
