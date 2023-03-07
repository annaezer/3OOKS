import React, {useContext} from "react";
import "./Favourites.css";
import {FavContext} from "../../context/FavContext";
import cutOffText from "../../helpers/cutOffText";
import {Toaster} from "react-hot-toast";
import bath from "../../assets/book bath.jpg";
import Header from "../../components/header/Header";

function Favourites() {

    // Access the state from the context
    const {fav, removeFav} = useContext(FavContext);
    console.log(fav);

    return (
        <>
            {/*I installed react hot toast to show notifications when favourites are removed for better ux*/}
            <Toaster/>
            {/*Re-using my Header component*/}
            <Header
                title="My favourites"
                img={bath}
            />
            <main>
                <section>
                    <h2>Browse through or adjust your favourite books</h2>
                </section>
                {/*Is there an array with favourites show them otherwise show the message "No favourites saved yet"*/}
                {fav.length > 0 ?
                    <section className="result-container">
                        {fav.map((favourite) => {
                            return (
                                // Using || or operator because my books come from two different APIs and therefore have different keys to address
                                <article className="bestseller-article" key={favourite.primary_isbn10 || favourite.id}>
                                    <img src={favourite.book_image || favourite.volumeInfo.imageLinks.thumbnail}
                                         alt={favourite.title || favourite.volumeInfo.title}/>
                                    <a href={favourite.amazon_product_url || favourite.volumeInfo.previewLink}>
                                        <h3>Title: {favourite.title || favourite.volumeInfo.title}</h3>
                                    </a>
                                    <p>Author: {favourite.author || favourite.volumeInfo.authors}</p>
                                    {/*Using my helper function to make sure long descriptions get cut off, but some books don't have a description and then my function gives an error: fixed it with condition*/}
                                    <p>Description: {favourite.description || favourite.volumeInfo.description ? cutOffText(favourite.description || favourite.volumeInfo.description) : "No description"}</p>
                                    {/*By clicking on the delete icon you remove the book from your favourites*/}
                                    <span className="material-symbols-outlined"
                                          onClick={() => removeFav(favourite)}>delete</span>
                                </article>
                            )
                        })}
                    </section>
                    :
                    <span>No books saved as favourite yet</span>
                }
            </main>
        </>
    );
}

export default Favourites;
