import React, {useEffect, useState} from "react";
import "./Bestsellers.css";
import {Link} from "react-router-dom";
import axios from "axios";

function Bestsellers() {
    // Creating state so I can save the data I get from my GET request and show the error and loading if appearing
    const [bestsellers, setBestsellers] = useState([]);
    const [nonFictionBestsellers, setNonFictionBestsellers] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [change, setChange] = useState(true);
    const [backup, setBackup] = useState([]);

    // I use mounting effect to prevent memory leak
    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            try {
                toggleError(false);
                const results = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.REACT_APP_API_KEY_2}`);
                console.log(results.data.results);
                setBestsellers(results.data.results.books);
                // I make a back up for my buttons to be able to change between fiction/nonfiction without overwriting
                setBackup(results.data.results.books)
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        void fetchData();
        toggleLoading(false);
    }, [])

    // Making a second API call to get the non-fiction bestsellers
    useEffect(() => {
        async function fetchMoreData() {
            toggleLoading(true);
            try {
                toggleError(false);
                const nonFictionResults = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${process.env.REACT_APP_API_KEY_2}`);
                setNonFictionBestsellers(nonFictionResults.data.results.books)
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        void fetchMoreData();
        toggleLoading(false);
    }, [])

    function buttonClick() {
        setChange(!change);
    }

    return (
        <>
            <header>
                {/*<img src={} alt="Books"/>*/}
                <h1>Bestsellers</h1>
            </header>
            <main>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Results</h2>
                        <h4>The three New York Times bestselling books of the moment</h4>
                        {loading && <span>Loading your results...</span>}
                        <div className="result-container">
                            {/*Get only three results out of the 15 I get from the call using method slice*/}
                            {bestsellers.slice(0, 3).map((bestseller) => {
                                return (
                                    <article className="bestseller-article" key={bestseller.primary_isbn10}>
                                        <img src={bestseller.book_image} alt="bestselling book"/>
                                        <a href={bestseller.amazon_product_url}>
                                            <h3>Title: {bestseller.title}</h3>
                                        </a>
                                        <p>Author: {bestseller.author}</p>
                                        <p>Description: {bestseller.description}</p>
                                    </article>
                                )
                            })}
                        </div>

                        {error && <span>Something went wrong while fetching data</span>}

                        <p>Not happy with the results? <Link to="/">Search again</Link> in a different way</p>

                        {change ?
                            <button type="button"
                                    onClick={() => buttonClick() + setBestsellers(nonFictionBestsellers)}>Change
                                to non fiction bestsellers</button>
                            :
                            <button type="button" onClick={() => buttonClick() + setBestsellers(backup)}>Change to
                                fiction</button>
                        }
                    </div>
                </section>
            </main>
        </>
    );
}

export default Bestsellers;
