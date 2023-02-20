import React, {useEffect, useState} from "react";
import "./Bestsellers.css";
import {Link} from "react-router-dom";
import axios from "axios";

function Bestsellers() {
    // Creating state so I can save the data I get from my GET request
    const [bestsellers, setBestsellers] = useState([]);

    // I use mounting effect to prevent memory leak
    useEffect(() => {

        async function fetchData() {
            try {
                const results = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_API_KEY_2}`);
                console.log(results.data.results);
                setBestsellers(results.data.results.books);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchData();
    }, [])

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
                        <p>Not happy with the results? <Link to='/'>Search again</Link> in a different way</p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Bestsellers;
