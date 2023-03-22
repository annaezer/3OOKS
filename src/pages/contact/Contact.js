import React, {useState} from "react";
import styles from "./Contact.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import bedbooks from "../../assets/girl on bed with books medium.jpeg";
import Header from "../../components/header/Header";
import Quote from "../../components/quote/Quote";
import Footer from "../../components/footer/Footer";

function Contact() {
// I use React Hook Form for easy validation; validate when user leaves field with onBlur
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    // Using State to display my message once contact form has been sent
    const [succesMessage, setSuccesMessage] = useState("");

    // Simple function that I can extend once there is a backend to send the data to
    function handleFormSubmit(data) {
        console.log(data);
        setSuccesMessage("Your message has been sent, thank you!");
        reset();
    };

    return (
        <>
            {/*Re-using my Header component*/}
            <Header
                title="Contact"
                img={bedbooks}
            />
            <main>
                <div className={styles["background-colour"]}>
                    <div className="outer-container">
                        <section className="inner-container">
                            <h2 className={styles.heading}>Please feel free to contact us for questions or
                                suggestions!</h2>
                            {/*Creating a simple contact form with name and email fields re-using Input components and a textarea for the message*/}
                            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                                <Input
                                    labelText="Your name"
                                    inputType="text"
                                    inputName="name"
                                    inputId="name-field"
                                    inputPlaceholder="Please fill in your name"
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
                                            message: "Your name can't be longer than 15 characters"
                                        }
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                <Input
                                    labelText="Your email"
                                    inputType="email"
                                    inputName="email"
                                    inputId="email-field"
                                    inputPlaceholder="Please fill in your email"
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
                                <label htmlFor="message-field" className={styles["label-text"]}>Your message
                                    <textarea
                                        className={styles.textarea}
                                        placeholder="Type here your message"
                                        id="message-field"
                                        rows="6"
                                        cols="40"
                                        {...register("message-content", {
                                            required: {
                                                value: true,
                                                message: "This field is required"
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "Your message needs to be at least 10 characters"
                                            },
                                            maxLength: {
                                                value: 250,
                                                message: "Your message can be 250 characters long"
                                            }
                                        })}
                                    >
                </textarea>
                                </label>

                                {errors["message-content"] &&
                                    <p className={styles["error-message"]}>{errors["message-content"].message}</p>}
                                <span className={styles["succes-message"]}>{succesMessage}</span>
                                <Button
                                    className={styles.button}
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </form>
                        </section>
                    </div>
                </div>
                <div className="outer-container">
                    <section className="inner-container">
                        {/*Re-using my Quote component*/}
                        <Quote
                            text="“A reader lives a thousand lives before he dies. The man who never reads lives only one.”"
                            author="- George R. R. Martin"
                        />
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Contact;
