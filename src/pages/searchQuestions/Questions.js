import React, {useEffect, useState} from "react";
import "./Questions.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import axios from "axios";
import bookCover from "../../assets/book on head.jpg";
import cutOffText from "../../helpers/cutOffText";

function Questions() {
    // Creating state so I can save the data I get from my get request and show the error and loading if appearing
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [time, setTime] = useState(null);
    const [review, setReview] = useState(null);
    const [finalBooks, setFinalBooks] = useState([]);

    // I use React Hook Form again because I want to be consistent
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    // Create an asynchronic function for my get request to the Books API, which receives the data object from the React Hook Form to access the values from the inputfield
    async function handleFormSubmit(data) {
        console.log(data);
        toggleLoading(true);
        try {
            toggleError(false);
            // Filter on books only: printType=books
            // Filter on newest: orderBy=newest
            // Filter on english: langRestrict=en
            // Filter on theme : categories can be sorted by adding "+subject:'x'" after the q, using my variable from the select menu. Unfortunately I cant filter on reviews or amount of pages in the request so I have to filter the results later. Therefore I ask for the highest maxResults=40 so there is something left to filter.
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:"${data.mood}"&printType=books&orderBy=newest&langRestrict=en&key=${process.env.REACT_APP_API_KEY}&maxResults=40`)
            console.log(response);
            setBooks(response.data.items);
            // Set the data.time en data.review in state otherwise I cant access it in the mounting effect later
            setTime(data.time);
            setReview(data.review);
        } catch (e) {
            toggleError(true);
            console.error(e);
            reset();
        }
        toggleLoading(false);
    }

    console.log(books);

    // Creating a mounting effect otherwise it rerenders too many times and crashes.
    // I want to filter my results based on the time a person has which I connect to number of pages(key pageCount in volumeInfo): less than 300 if no time, more than 300 if all the time. So making an if/else statement to work with the values from my select menu which I saved in state to access here.
    useEffect(() => {
        if (time === "0") {
            const filteredData = books.filter(book => book.volumeInfo.pageCount <= 300);
            setFilteredBooks(filteredData);
        } else {
            const filteredData = books.filter(book => book.volumeInfo.pageCount > 300);
            setFilteredBooks(filteredData);
        }
    }, [books, time])

    console.log(filteredBooks);

    // Using my filtered books to filter again on ratings (key averageRating in volumeInfo). Making if statements to work with the values from my select menu which I saved in state to access here. The highest possible rating is 5.0. Unfortunately there are a lot of books without reviews so I won't get 3 results back every time.
    useEffect(() => {
        if (review === "0") {
            const filteredData = filteredBooks.filter(book => book.volumeInfo.averageRating === undefined);
            setFinalBooks(filteredData);
        }
        if (review === "1") {
            const filteredData = filteredBooks.filter(book => book.volumeInfo.averageRating <= 3.0);
            setFinalBooks(filteredData);
        }
        if (review === "2") {
            const filteredData = filteredBooks.filter(book => book.volumeInfo.averageRating >= 3.5);
            setFinalBooks(filteredData);
        }
    }, [filteredBooks, time, review])

    return (
        <>
            <h1>Questions</h1>
            <p>Answer the three questions below to get max three results back</p>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong while fetching data</p>}

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <label htmlFor="feelings">
                    How do you feel?
                    <select id="feelings" required {...register("mood")}>
                        {/*Getting the themes from the BISG (books industry study group) database, scaling it to 3 very different ones: "humor", "self-help" and "true crime" and connect them as value to the options from the select menu so I can use them as variable in my get request.*/}
                        <option value="" disabled selected hidden>Pick your answer</option>
                        <option value="true+crime">I can face reality</option>
                        <option value="humor">Sad, please cheer me up</option>
                        <option value="self-help">Pff, I need to work on myself</option>
                    </select>
                </label>

                <label htmlFor="amount-of-time">
                    How much time do you have?
                    <select id="amount-of-time" required {...register("time")}>
                        <option value="" disabled selected hidden>Pick your answer</option>
                        <option value="0">Time is money</option>
                        <option value="1">I've got forever</option>
                    </select>
                </label>

                <label htmlFor="reviews">
                    How important are good reviews?
                    <select id="reviews" required {...register("review")}>
                        <option value="" disabled selected hidden>Pick your answer</option>
                        <option value="0">I don't care</option>
                        <option value="1">I love the underappreciated ones</option>
                        <option value="2">Only the best - obviously!</option>
                    </select>
                </label>

                <Button
                    type="submit">
                    Search
                </Button>
            </form>

            {/*Mapping over the results to be able to show the right data on the page, but not showing when there are no results*/}
            {finalBooks !== [] ?
                <div className="result-container">
                    {/*Using slice method to get only 3 results*/}
                    {finalBooks.slice(0, 3).map((book) => {
                        return (
                            <article className="database-article" key={book.id}>
                                {/*Some books don't have pictures and therefore don't load: fixed it with condition*/}
                                <img
                                    src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : bookCover}
                                    alt={book.volumeInfo.title}/>
                                <a href={book.volumeInfo.previewLink}>
                                    <h3>Title: {book.volumeInfo.title}</h3>
                                </a>
                                <p>Author: {book.volumeInfo.authors}</p>
                                <p>Description: {cutOffText(book.volumeInfo.description)}</p>
                                <p>Pages: {book.volumeInfo.pageCount}</p>
                                <p>Rating: {book.volumeInfo.averageRating}</p>
                            </article>
                        )
                    })}
                </div>
                :
                <p>Sorry there are no matches, try again!</p>
            }

            <p>Not happy with the results? <Link to='/'>Search again</Link> in a different way</p>
        </>
    );
}

export default Questions;
