import React, {useContext} from "react";
import "./Favourites.css";
import {FavContext} from "../../context/FavContext";
import cutOffText from "../../helpers/cutOffText";
import {Toaster} from "react-hot-toast";

function Favourites() {

    // Access the state from the context
    const {fav, removeFav} = useContext(FavContext);
    console.log(fav);

    return (
        <>
            {/*I installed react hot toast to show notifications when favourites are removed for better ux*/}
            <Toaster/>

            <h1>Favourites</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus enim quis ut. Asperiores at
                cupiditate error facilis laudantium magni molestiae mollitia reiciendis sequi voluptatem. Accusantium
                animi at beatae blanditiis commodi consequatur cupiditate, dolor enim est et exercitationem explicabo
                facere iure iusto labore laudantium libero necessitatibus, non numquam provident quibusdam repellat sed
                similique sit tempora totam veniam. Aliquam laborum quidem quos!</p>

            {/*Is there an array with favourites show them otherwise show the message "no favourites saved yet"*/}
            {fav.length > 0 ?
                <div className="result-container">
                    {fav.map((favourite) => {

                        return (
                            // Using || or operator because my books come from two different APIs and therefore have different keys to address
                            <article className="bestseller-article" key={favourite.primary_isbn10 || favourite.id}>
                                <img src={favourite.book_image || favourite.volumeInfo.imageLinks.thumbnail} alt={favourite.title || favourite.volumeInfo.title}/>
                                <a href={favourite.amazon_product_url || favourite.volumeInfo.previewLink}>
                                    <h3>Title: {favourite.title || favourite.volumeInfo.title}</h3>
                                </a>
                                <p>Author: {favourite.author || favourite.volumeInfo.authors}</p>
                                <p>Description: {cutOffText(favourite.description || favourite.volumeInfo.description)}</p>
                                {/*By clicking on the delete icon you remove the book from your favourites*/}
                                <span className="material-symbols-outlined"
                                      onClick={() => removeFav(favourite)}>delete</span>
                            </article>

                        )
                    })}
                </div>
                :
                <p>No favourites saved yet</p>
            }
        </>
    );
}

export default Favourites;
