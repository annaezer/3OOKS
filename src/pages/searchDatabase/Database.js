import React, {useEffect, useRef, useState} from "react";
import "./Database.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import axios from "axios";
import {useForm} from "react-hook-form";
import bookCover from "../../assets/book on head.jpg"

function Database() {
    // I use React Hook Form again because I want to be consistent
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onSubmit"});

    // I use useState to make sure I can put the error messages in the UI
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [results, setResults] = useState([]);

    // Use Ref to store the function as it is outside the scope for the form otherwise
    const handleSearchRef = useRef();

    // I use mounting effect to prevent memory leak
    useEffect(() => {
        handleSearchRef.current = handleSearch;
        // Create an asynchronic function for my get request to the Books API, which receives the data object from the React Hook Form to access the values from the inputfield
        async function handleSearch(data) {
            console.log(data);
            toggleLoading(true);
            // First checking if there has been a search otherwise my errorMessage gets activated
            if (data) try {
                toggleError(false);
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${data.search}&key=${process.env.REACT_APP_API_KEY}&maxResults=3`)
                console.log(response);
                // Save the results array in the state
                setResults(response.data.items);
                // Use reset functionality from Hook Form so I can empty the fields for the user to try again
                reset();
            } catch (e) {
                toggleError(true);
                console.error(e);
                reset();
            }
            toggleLoading(false);
        }

        void handleSearch();
    }, [])

    // Creating variable with Ref so I can use it in the form in the return
    const handleSearch = handleSearchRef.current;

    return (
        <>
            <h1>Database</h1>
            {error && <span>Something went wrong while fetching data</span>}
            {/*I use the method HandleSubmit from the Hook Form to be able to use all the functionality*/}
            <form onSubmit={handleSubmit(handleSearch)}>

                {/*Using the Input component again for convenience*/}
                <Input
                    inputType="text"
                    inputName="search"
                    inputId="search-field"
                    inputLabel="Search author, subject or title"
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
                    disabled={loading}
                >
                    Search
                </Button>

            </form>

            {/*Mapping over the results to be able to show the right data on the page, but not showing when there are no results*/}
            {results !== undefined ?
                <div className="result-container">
                    {results.map((result) => {
                        return (
                            <article className="database-article" key={result.id}>
                                {/*Some books don't have pictures and therefore don't load: fixed it with condition*/}
                                <img
                                    src={result.volumeInfo.imageLinks !== undefined ? result.volumeInfo.imageLinks.thumbnail : bookCover}
                                    alt="bookcover"/>
                                <a href={result.volumeInfo.previewLink}>
                                    <h3>Title: {result.volumeInfo.title}</h3>
                                </a>
                                <p>Author: {result.volumeInfo.authors}</p>
                                <p>Description: {result.volumeInfo.description}</p>
                            </article>
                        )
                    })}
                </div>
                :
                <p>Sorry there are no matches, try again!</p>
            }

            <p>Not happy with the results? <Link to="/">Search again</Link> in a different way</p>
        </>
    );
}

export default Database;
