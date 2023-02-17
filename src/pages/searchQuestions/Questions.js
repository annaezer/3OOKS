import React from "react";
import "./Questions.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";

function Questions() {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    async function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <h1>Questions</h1>
            <p>Answer the three questions below to get three results back</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <label htmlFor="amount-of-time">
                    How much time do you have?
                    <select id="amount-of-time" {...register("time")}>
                        <option value="day">one day</option>
                        <option value="week">one week</option>
                        <option value="much">forever</option>
                    </select>
                </label>

                <label htmlFor="feelings">
                    How do you feel?
                    <select id="feelings" {...register("mood")}>
                        <option value="good">good</option>
                        <option value="bad">bad</option>
                        <option value="allright">allright</option>
                    </select>
                </label>

                <label htmlFor="reviews">
                    How important are good reviews?
                    <select id="reviews" {...register("review")}>
                        <option value="very">very</option>
                        <option value="not at all">not at all</option>
                        <option value="medium">medium</option>
                    </select>
                </label>

                <Button
                    type="submit">
                    Search
                </Button>
            </form>

            <p>Not happy with the results? <Link to='/'>Search again</Link> in a different way</p>
        </>
    );
}

export default Questions;
