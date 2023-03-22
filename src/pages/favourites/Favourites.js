import React, {useContext} from "react";
import styles from "./Favourites.module.css";
import {FavContext} from "../../context/FavContext";
import cutOffText from "../../helpers/cutOffText";
import {Toaster} from "react-hot-toast";
import beach from "../../assets/reading in sea.jpeg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {Link} from "react-router-dom";

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
                img={beach}
            />
            <main>
                <div className="outer-container">
                    <section className="inner-container">
                        <h2>Browse through or adjust your favourite books</h2>
                        {/*Is there an array with favourites show them otherwise show the message "No favourites saved yet"*/}
                        {fav.length > 0 ?
                            <div>
                                {fav.map((favourite) => {
                                    return (
                                        // Using || or operator because my books come from two different APIs and therefore have different keys to address
                                        <article className={styles.book}
                                                 key={favourite.primary_isbn10 || favourite.id}>
                                            <div className={styles["image-container"]}>
                                                <img className={styles["book-image"]}
                                                     src={favourite.book_image || favourite.volumeInfo.imageLinks.thumbnail}
                                                     alt={favourite.title || favourite.volumeInfo.title}/>
                                                <div className={styles.rectangle}></div>
                                            </div>
                                            <div className={styles["book-text"]}>
                                                <a
                                                    href={favourite.amazon_product_url || favourite.volumeInfo.previewLink}>
                                                    <h3 className={styles.title}>{favourite.title || favourite.volumeInfo.title}</h3>
                                                </a>
                                                <p><span
                                                    className={styles.keys}>Author: </span> {favourite.author || favourite.volumeInfo.authors}
                                                </p>
                                                {/*Using my helper function to make sure long descriptions get cut off, but some books don't have a description and then my function gives an error: fixed it with condition*/}
                                                <p><span
                                                    className={styles.keys}>Description: </span> {favourite.description || favourite.volumeInfo.description ? cutOffText(favourite.description || favourite.volumeInfo.description) : "No description"}
                                                </p>
                                                {/*By clicking on the delete icon you remove the book from your favourites*/}
                                                <span className="material-symbols-outlined"
                                                      onClick={() => removeFav(favourite)}>delete</span>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>

                            :
                            <span className={styles.message}>No books saved as favourite yet: start your <Link to="/"
                                                                                                               className={styles.link}>search!</Link></span>
                        }
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Favourites;
