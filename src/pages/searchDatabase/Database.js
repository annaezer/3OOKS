import React, {useContext, useState} from "react";
import "./Database.css";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import axios from "axios";
import {useForm} from "react-hook-form";
import bookCover from "../../assets/book on head.jpg"
import cutOffText from "../../helpers/cutOffText";
import {FavContext} from "../../context/FavContext";
import {AuthContext} from "../../context/AuthContext";
import {Toaster} from "react-hot-toast";

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

    // Create an asynchronic function for my get request to the Books API, which receives the data object from the React Hook Form to access the values from the inputfield
    async function handleSearch(data) {
        console.log(data);
        toggleLoading(true);
        try {
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

    return (
        <>
            {/*I installed react hot toast to show notifications when favourites are added for better ux*/}
            <Toaster/>

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
            {results.length ?
                <div className="result-container">
                    {results.map((result) => {
                        return (
                            <article className="database-article" key={result.id}>
                                {/*Some books don't have pictures and therefore don't load: fixed it with condition*/}
                                <img
                                    src={result.volumeInfo.imageLinks !== undefined ? result.volumeInfo.imageLinks.thumbnail : bookCover}
                                    alt={result.volumeInfo.title}/>
                                <a href={result.volumeInfo.previewLink}>
                                    <h3>Title: {result.volumeInfo.title}</h3>
                                </a>
                                <p>Author: {result.volumeInfo.authors}</p>
                                <p>Description: {cutOffText(result.volumeInfo.description)}</p>
                                {/*By clicking on the heart you save the book to your favourites - but function only available if logged in*/}
                                {auth ? <span className="material-symbols-outlined" onClick={() => addFav(result)}>favorite</span>
                                    : <span></span>
                                }
                            </article>
                        )
                    })}
                </div>
                :
                <p>No results, try something else</p>
            }

            <p>Not happy with the results? <Link to="/">Search again</Link> in a different way</p>
        </>
    );
}

export default Database;
