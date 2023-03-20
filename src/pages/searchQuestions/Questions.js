import React, {useContext, useEffect, useState} from "react";
import styles from "./Questions.module.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import axios from "axios";
import bookCover from "../../assets/book on head medium.jpeg";
import cutOffText from "../../helpers/cutOffText";
import {FavContext} from "../../context/FavContext";
import {AuthContext} from "../../context/AuthContext";
import {Toaster} from "react-hot-toast";
import Header from "../../components/header/Header";
import sunset from "../../assets/girl sunset.jpg";
import Footer from "../../components/footer/Footer";

function Questions() {
    // Access the state from the context so I can save favourites and know if there is a logged in user for conditionally showing the option to store favourites
    const {addFav} = useContext(FavContext);
    const {auth} = useContext(AuthContext);

    // Creating state so I can save the data I get from my get request and show the error and loading if appearing
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [time, setTime] = useState(null);
    const [review, setReview] = useState(null);
    const [finalBooks, setFinalBooks] = useState([]);
    const [searched, setSearched] = useState(false);

    // I use React Hook Form again because I want to be consistent
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    // Create an asynchronic function for my get request to the Books API, which receives the data object from the React Hook Form to access the values from the inputfield
    async function handleFormSubmit(data) {
        console.log(data);
        // Creating my url variable where I filter on books only: printType=books, filter on newest: orderBy=newest, filter on english: langRestrict=en and most important filter on theme : categories can be sorted by adding "+subject:'x'" after the q, using my variable data.mood from the select menu. Unfortunately I can't filter on reviews or amount of pages in the request so I have to filter the results later. Therefore I ask for the highest maxResults=40 so there is something left to filter.
        const QUESTIONS_API_URL = `https://www.googleapis.com/books/v1/volumes?q=subject:"${data.mood}"&printType=books&orderBy=newest&langRestrict=en&key=${process.env.REACT_APP_API_KEY}&maxResults=40`
        toggleLoading(true);
        try {
            toggleError(false);
            const response = await axios.get(QUESTIONS_API_URL);
            console.log(response);
            setBooks(response.data.items);
            // Set the data.time en data.review in state otherwise I cant access it in the mounting effect later
            setTime(data.time);
            setReview(data.review);
            // Set searched to true so I can show a conditional message if there are no results
            setSearched(true);
        } catch (e) {
            toggleError(true);
            console.error(e);
            reset();
        }
        toggleLoading(false);
    };
    console.log(books);

    // Creating a mounting effect otherwise it rerenders too many times and crashes.
    // I want to filter my results based on the time a person has which I connect to number of pages(key pageCount in volumeInfo): less than 300 if no time, more than 300 if all the time. So making an if/else statement to work with the values from my select menu which I saved in state to access here.
    useEffect(() => {
        if (time === "no time") {
            const filteredData = books.filter(book => book.volumeInfo.pageCount <= 300);
            setFilteredBooks(filteredData);
        } else {
            const filteredData = books.filter(book => book.volumeInfo.pageCount > 300);
            setFilteredBooks(filteredData);
        }
    }, [books, time]);
    console.log(filteredBooks);

    // Using my filtered books to filter again on ratings (key averageRating in volumeInfo). Making if statements to work with the values from my select menu which I saved in state to access here. The highest possible rating is 5.0. Unfortunately there are a lot of books without reviews so I won't get 3 results back every time.
    useEffect(() => {
        if (review === "not important") {
            const filteredData = filteredBooks.filter(book => book.volumeInfo.averageRating === undefined);
            setFinalBooks(filteredData);
        }
        if (review === "bad reviews") {
            const filteredData = filteredBooks.filter(book => book.volumeInfo.averageRating <= 3.0);
            setFinalBooks(filteredData);
        }
        if (review === "best reviews") {
            const filteredData = filteredBooks.filter(book => book.volumeInfo.averageRating >= 3.5);
            setFinalBooks(filteredData);
        }
    }, [filteredBooks, time, review]);

    return (
        <>
            {/*I installed react hot toast to show notifications when favourites are added for better ux*/}
            <Toaster/>
            {/*Re-using my Header component*/}
            <Header
                title="Questions"
                img={sunset}
            />
            <main>
                <div className={styles["background-colour"]}>
                    <div className="outer-container">
                        <section className="inner-container">
                            <h2 className={styles.heading}>Answer the questions below</h2>
                            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                                <label className={styles.label} htmlFor="feelings">
                                    How do you feel?
                                    <select className={styles.select} id="feelings" {...register("mood", {
                                        required: {
                                            value: true,
                                            message: "If you don't pick an answer, we can't select your books!"
                                        }
                                    })} defaultValue="">
                                        {/*Getting the themes from the BISG (books industry study group) database, scaling it to 8 very different ones and connect them as value to the options from the select menu so I can use them as variable in my get request.*/}
                                        <option value="" disabled hidden>Pick your answer</option>
                                        <option value="horror">I'm in a dark mood</option>
                                        <option value="humor">Sad, please cheer me up</option>
                                        <option value="self-help">Pff, I need to work on myself</option>
                                        <option value="travel">Some adventure, anyone?</option>
                                        <option value="fantasy">I need to escape reality</option>
                                        <option value="romance">Give me hope after my broken heart</option>
                                        <option value="historical+fiction">Everything was better in the old days
                                        </option>
                                        <option value="autobiography">I want to be inspired by the great</option>
                                    </select>
                                </label>
                                {errors.mood && <p className={styles["error-message"]}>{errors.mood.message}</p>}

                                <label className={styles.label} htmlFor="amount-of-time">
                                    How much time do you have?
                                    <select className={styles.select} id="amount-of-time" {...register("time", {
                                        required: {
                                            value: true,
                                            message: "If you don't pick an answer, we can't select your books!"
                                        }
                                    })} defaultValue="">
                                        <option value="" disabled hidden>Pick your answer</option>
                                        <option value="no time">Time is money</option>
                                        <option value="time">I've got forever</option>
                                    </select>
                                </label>
                                {errors.time && <p className={styles["error-message"]}>{errors.time.message}</p>}

                                <label className={styles.label} htmlFor="reviews">
                                    How important are good reviews?
                                    <select className={styles.select} id="reviews" {...register("review", {
                                        required: {
                                            value: true,
                                            message: "If you don't pick an answer, we can't select your books!"
                                        }
                                    })} defaultValue="">
                                        <option value="" disabled hidden>Pick your answer</option>
                                        <option value="not important">I don't care</option>
                                        <option value="bad reviews">I love the underappreciated ones</option>
                                        <option value="best reviews">Only the best - obviously!</option>
                                    </select>
                                </label>
                                {errors.review && <p className={styles["error-message"]}>{errors.review.message}</p>}
                                <Button
                                    className={styles.button}
                                    type="submit">
                                    Search
                                </Button>
                            </form>
                        </section>
                    </div>
                </div>
                <div className="outer-container">
                    <section className="inner-container">
                        <h2>Pick your book</h2>
                        {/*If loading show this message*/}
                        {loading && <p className={styles.message}>Loading your books...</p>}
                        {/*If there is an error show this message:*/}
                        {error && <p className={styles.message}>Something went wrong while fetching data</p>}
                        {/*Mapping over the results if there are any to be able to show the right data on the page*/}
                        {finalBooks.length > 0 ?
                            <div>
                                {/*Using slice method to get only 3 results*/}
                                {finalBooks.slice(0, 3).map((book) => {
                                    return (
                                        <article className={styles.book} key={book.id}>
                                            {/*Some books don't have pictures and therefore don't load: fixed it with condition*/}
                                            <div className={styles["image-container"]}>
                                                <img className={styles["book-image"]}
                                                     src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : bookCover}
                                                     alt={book.volumeInfo.title}/>
                                                <div className={styles.rectangle}></div>
                                            </div>
                                            <div className={styles["book-text"]}>
                                                <a className={styles.link} href={book.volumeInfo.previewLink}>
                                                    <h3 className={styles.title}>{book.volumeInfo.title}</h3>
                                                </a>
                                                <p><span
                                                    className={styles.keys}>Author: </span> {book.volumeInfo.authors}</p>
                                                {/*Some books don't have a description and then my function gives an error: fixed it with condition*/}
                                                <p><span
                                                    className={styles.keys}>Description: </span> {book.volumeInfo.description ? cutOffText(book.volumeInfo.description) : "No description."}
                                                </p>
                                                <p><span
                                                    className={styles.keys}>Pages: </span> {book.volumeInfo.pageCount}
                                                </p>
                                                <p><span
                                                    className={styles.keys}>Rating: </span> {book.volumeInfo.averageRating}
                                                </p>
                                                {/*By clicking on the heart you save the book to your favourites - but function only available if logged in*/}
                                                {auth ? <span className="material-symbols-outlined"
                                                              onClick={() => addFav(book)}>favorite</span>
                                                    : <span></span>
                                                }
                                            </div>
                                        </article>
                                    )
                                })}
                                <p className={styles["results-message"]}>Not happy with the results? <Link to="/" className={styles.link}>Search
                                    again</Link> in a different way</p>
                            </div>
                            :
                            <p className={styles.text}>But you have to answer the questions first...</p>
                        }
                        {/*If there is a search done but no results show this message:*/}
                        {searched && finalBooks.length === 0 && (
                            <p className={styles["results-message"]}>No results, try changing your mind about
                                something!</p>)}
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Questions;
