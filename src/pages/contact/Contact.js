import React, {useState} from 'react';
import './Contact.css';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";

function Contact() {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onBlur'});

    const [succesMessage, setSuccesMessage] = useState("");

    function handleFormSubmit(data) {
        console.log(data);
        reset();
        setSuccesMessage("Your message has been sent!")
    }

    return (
        <>
            <h1>Contact</h1>
            <p>Please feel free to contact us for questions or suggestions!</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <Input
                    inputType="text"
                    inputName="name"
                    inputId="name-field"
                    inputLabel="Your name:"
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
                    inputLabel="Your email:"
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

                <label htmlFor="message-field">
                    Your message:
                    <textarea
                        id="message-field"
                        rows="4"
                        cols="40"
                        {...register("message-content", {
                            required: {
                                value: true,
                                message: "This field is required"
                            },
                            minLength: {
                                value: 10,
                                message: "Your message needs to be at least 10 characters",
                            },
                            maxLength: {
                                value: 100,
                                message: "Your message can be 100 characters long",
                            }
                        })}
                    >
                </textarea>
                </label>
                {errors['message-content'] && <p>{errors['message-content'].message}</p>}

                <Button
                    type="submit"
                    disabled={false}
                >
                    Send
                </Button>

                <p>{succesMessage}</p>

            </form>
        </>
    );
}

export default Contact;
