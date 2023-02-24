import React, {useState} from "react";
import "./Questions.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import axios from "axios";

function Questions() {

    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});

    // Filter on books only: printType=books toevoegen aan call
    // Filter on newest: orderBy=newest toevoegen aan call
    // Filter on english: langRestrict=en toevoegen aan call

    // Filter on theme : categories can be sorted by adding "+subject:'category here in variable'" after the q.
    // Getting the themes from the BISG (books industry study group) database, scaling it to 3 very different ones: "humor", "self-help" and "true crime" and connect them as value to the options from the select menu.

    // Filter on ratings; averageRating =key in volumeInfo best highest, lowest, average
// &orderBy=-averageRating (highest first)

    // Filteren on pageCount =key in volumeInfo
    // <100 is least time
    // <500 is medium
    // >500 is max


    async function handleFormSubmit(data) {
        console.log(data);
        toggleLoading(true);
        try {
            toggleError(false);
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:"${data.mood}"&printType=books&orderBy=newest&langRestrict=en&key=${process.env.REACT_APP_API_KEY}&maxResults=40`)
            console.log(response);
            setBooks(response.data.items);

            const filteredData = books.filter((book) => {
                return book.volumeInfo.pageCount >= 100
            })
            setFilteredBooks(filteredData);
            console.log(filteredBooks);
        } catch (e) {
            toggleError(true);
            console.error(e);
            reset();
        }
        toggleLoading(false);
    }

    console.log(books);
    // ${data.time}+${data.mood}+${data.review}



    return (
        <>
            <h1>Questions</h1>
            <p>Answer the three questions below to get three results back</p>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong while fetching data</p>}
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <label htmlFor="amount-of-time">
                    How much time do you have?
                    <select id="amount-of-time" {...register("time")}>
                        <option value="max 100">one day</option>
                        <option value="100-500">one week</option>
                        <option value="500 or more">forever</option>
                    </select>
                </label>

                <label htmlFor="feelings">
                    How do you feel?
                    <select id="feelings" {...register("mood")}>
                        <option value="true+crime">I can face reality</option>
                        <option value="humor">Sad, please cheer me up</option>
                        <option value="self-help">Pff, I need to work on myself</option>
                    </select>
                </label>

                <label htmlFor="reviews">
                    How important are good reviews?
                    <select id="reviews" {...register("review")}>
                        <option value="-averageReview">Only the best - obviously!</option>
                        <option value="averageReview">I love the underappreciated ones</option>
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
