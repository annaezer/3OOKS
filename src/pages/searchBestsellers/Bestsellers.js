import React, {useContext, useEffect, useState} from "react";
import "./Bestsellers.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {FavContext} from "../../context/FavContext";
import cutOffText from "../../helpers/cutOffText";
import {AuthContext} from "../../context/AuthContext";
import {Toaster} from "react-hot-toast";
import outside from "../../assets/girl outside reading medium.jpeg";
import Header from "../../components/header/Header";

// Making variables from my URL and using my key as variable from env to keep it safe
const BESTSELLERS_API_URL_FICTION = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.REACT_APP_API_KEY_2}`;
const BESTSELLERS_API_URL_NONFICTION = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${process.env.REACT_APP_API_KEY_2}`;

function Bestsellers() {
    // Access the state from the context so I can save favourites and know if there is a logged in user for conditionally showing the option to store favourites
    const {addFav} = useContext(FavContext);
    const {auth} = useContext(AuthContext);

    // Creating state so I can save the data I get from my GET request, show the error and loading if appearing and change between fiction and non fiction
    const [bestsellers, setBestsellers] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [isFiction, setIsFiction] = useState(true);

    // I use mounting effect to prevent memory leak
    useEffect(() => {
        // Creating this variables so I can cancel the request
        const controller = new AbortController();
        const {signal} = controller;

        async function fetchData() {
            toggleLoading(true);
            try {
                //Unfortunately the Google Books API could not fetch the bestselling books of the moment so I changed for this page to another API from the New York Times
                // Making two different variables and calls, one for fiction and one for non fiction, fetching them together with Promise.all to improve performance
                const [fictionResults, nonFictionResults] = await Promise.all([
                    axios.get(BESTSELLERS_API_URL_FICTION, {signal}),
                    axios.get(BESTSELLERS_API_URL_NONFICTION, {signal})
                ]);
                // Storing only the top 3 results out of the 15 I get from the call using method slice
                setBestsellers(isFiction ? fictionResults.data.results.books.slice(0, 3) : nonFictionResults.data.results.books.slice(0, 3));
                console.log(bestsellers);
            } catch (e) {
                toggleError(true);
                if (axios.isCancel(e)) {
                    console.log("The axios request was cancelled");
                } else {
                    console.error(e);
                }
            }
            toggleLoading(false);
            toggleError(false);
        }

        void fetchData();

// Returning the clean up function
        return function cleanup() {
            controller.abort();
        }
        //    Using isFiction as a dependency so it mounts again when user toggles between fiction and non-fiction
    }, [isFiction]);

    // Creating a function for changing the fiction to non-fiction
    function toggleFiction() {
        setIsFiction(!isFiction);
    }

    return (
        <>
            {/*I installed react hot toast to show notifications when favourites are added for better ux, I preferred to color the heart but could not manage to just colour one instead of all*/}
            <Toaster/>
            {/*Re-using my Header component*/}
            <Header
                title="Bestsellers"
                img={outside}
            />
            <main>
                <section>
                    <h2>Pick your book</h2>
                    <h4>The 3 New York Times bestselling books of the moment</h4>
                </section>
                <section className="outer-content-container">
                    {/*If loading show this message*/}
                    {loading && <p>Loading your books...</p>}
                    {/*If there is an error show this message:*/}
                    {error && <p>Something went wrong while fetching data</p>}
                    <div className="inner-content-container">
                        {/*If the data is fetched, so the bestsellers array has length, show the results:*/}
                        {bestsellers.length > 0 &&
                            <div className="result-container">
                                {bestsellers.map((bestseller) => {
                                    return (
                                        <article className="bestseller-article" key={bestseller.primary_isbn10}>
                                            <img src={bestseller.book_image} alt={bestseller.title}/>
                                            <a href={bestseller.amazon_product_url}>
                                                <h3>Title: {bestseller.title}</h3>
                                            </a>
                                            <p>Author: {bestseller.author}</p>
                                            {/*Using my helper function to make sure long descriptions get cut off, but some books don't have a description and then my function gives an error: fixed it with condition*/}
                                            <p>Description: {bestseller.description ? cutOffText(bestseller.description) : "No description."}</p>
                                            {/*By clicking on the heart you save the book to your favourites - but function only available if logged in*/}
                                            {auth ? <span className="material-symbols-outlined"
                                                          onClick={() => addFav(bestseller)}>favorite</span>
                                                : <span></span>
                                            }
                                        </article>
                                    )
                                })}
                                <p>Not happy with the results? <Link to="/">Search again</Link> in a different way or
                                    check out the other top 3 by clicking the button below!</p>
                            </div>
                        }

                        {/*If isFiction is true; so initial state, I want to be able to click and change it to non fiction, plus the other way around*/}
                        <button onClick={toggleFiction}>
                            {isFiction ? "Non-Fiction" : "Fiction"} Bestsellers
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Bestsellers;
