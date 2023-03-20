import React, {useContext, useState} from "react";
import styles from "./Database.module.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import axios from "axios";
import {useForm} from "react-hook-form";
import bookCover from "../../assets/book on head medium.jpeg"
import cutOffText from "../../helpers/cutOffText";
import {FavContext} from "../../context/FavContext";
import {AuthContext} from "../../context/AuthContext";
import {Toaster} from "react-hot-toast";
import couple from "../../assets/couple reading medium.jpeg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


function Database() {
    // Access the state from the context so I can save favourites and know if there is a logged in user for conditionally showing the option to store favourites
    const {addFav} = useContext(FavContext);
    const {auth} = useContext(AuthContext);

    // I use React Hook Form again because I want to be consistent
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    // I use useState to make sure I can put the error messages in the UI and save my data from the get request
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    // Create an asynchronic function for my get request to the Books API, which receives the data object from the React Hook Form to access the values from the inputfield
    async function handleSearch(data) {
        // Creating my url variable with the search query variable, my key and the max results set to 3
        const DATABASE_API_URL = `https://www.googleapis.com/books/v1/volumes?q=${data.search}&key=${process.env.REACT_APP_API_KEY}&maxResults=3`;
        console.log(data);
        toggleLoading(true);
        try {
            toggleError(false);
            const response = await axios.get(DATABASE_API_URL);
            console.log(response);
            // Save the results array in the state but if nothing comes up set it to empty array
            response.data.items ? setResults(response.data.items) : setResults([]);
            // Set searched to true so I can show a conditional message if there are no results
            setSearched(true);
            // Use reset functionality from Hook Form so I can empty the fields for the user to try again
            reset();
        } catch (e) {
            toggleError(true);
            console.error(e);
            reset();
        }
        toggleLoading(false);
    };

    return (
        <>
            {/*I installed react hot toast to show notifications when favourites are added for better ux*/}
            <Toaster/>
            {/*Re-using my Header component*/}
            <Header
                title="Database"
                img={couple}
            />
            <main>
                <div className="outer-container">
                    <section className="inner-container">
                        <h2 className={styles.heading}>Fill in your query</h2>
                        {/*If loading show this message*/}
                        {loading && <p className={styles.message}>Loading your books...</p>}
                        {/*If there is an error show this message:*/}
                        {error && <p className={styles.message}>Something went wrong while fetching data</p>}
                        {/*I use the method HandleSubmit from the Hook Form to be able to use all the functionality*/}
                        <form onSubmit={handleSubmit(handleSearch)}>
                            {/*Using the Input component again for convenience*/}
                            <Input
                                inputType="text"
                                inputName="search"
                                inputId="search-field"
                                inputPlaceholder="Search author, subject or title"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Fill in your query to start the search!"
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />
                            <Button
                                type="submit"
                            >
                                Search
                            </Button>
                        </form>
                        {/*Mapping over the results to be able to show the right data on the page, but not showing when there are no results*/}
                        {results.length > 0 &&
                            <div>
                                {results.map((result) => {
                                    return (
                                        <article className={styles.book} key={result.id}>
                                            {/*Some books don't have pictures and therefore don't load: fixed it with condition*/}
                                            <div className={styles["image-container"]}>
                                                <img className={styles["book-image"]}
                                                     src={result.volumeInfo.imageLinks !== undefined ? result.volumeInfo.imageLinks.thumbnail : bookCover}
                                                     alt={result.volumeInfo.title}/>
                                                <div className={styles.rectangle}></div>
                                            </div>
                                            <div className={styles["book-text"]}>
                                                <a className={styles.link} href={result.volumeInfo.previewLink}>
                                                    <h3 className={styles.title}>{result.volumeInfo.title}</h3>
                                                </a>
                                                <p><span
                                                    className={styles.keys}> Author: </span>{result.volumeInfo.authors}
                                                </p>
                                                {/*Some books don't have a description and then my function gives an error: fixed it with condition*/}
                                                <p><span
                                                    className={styles.keys}>Description: </span>{result.volumeInfo.description ? cutOffText(result.volumeInfo.description) : "No description."}
                                                </p>
                                                {/*By clicking on the heart you save the book to your favourites - but function only available if logged in*/}
                                                {auth ? <span className="material-symbols-outlined"
                                                              onClick={() => addFav(result)}>favorite</span>
                                                    : <span></span>
                                                }
                                            </div>
                                        </article>
                                    )
                                })}
                                <p className={styles["results-message"]}>Not happy with the results? <Link to="/"
                                                                                                           className={styles.link}>Search
                                    again</Link> in a different way</p>
                            </div>
                        }
                        {/*If there is a search done but no results show this message:*/}
                        {searched && results.length === 0 && (
                            <p className={styles["results-message"]}>No results, try something else!</p>)}
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Database;
