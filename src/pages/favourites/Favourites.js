import React, {useContext, useEffect} from "react";
import "./Favourites.css";
import {FavContext} from "../../context/FavContext";
import cutOffText from "../../helpers/cutOffText";

function Favourites() {

    // Access the state from the context
    const {fav, setFav, removeFav} = useContext(FavContext);

    console.log(fav);

    return (
        <>
            {console.log (fav)}
            <h1>Favourites</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus enim quis ut. Asperiores at
                cupiditate error facilis laudantium magni molestiae mollitia reiciendis sequi voluptatem. Accusantium
                animi at beatae blanditiis commodi consequatur cupiditate, dolor enim est et exercitationem explicabo
                facere iure iusto labore laudantium libero necessitatibus, non numquam provident quibusdam repellat sed
                similique sit tempora totam veniam. Aliquam laborum quidem quos!</p>

            {fav.length > 0 ?
                <div className="result-container">
                    {/*Get only three results out of the 15 I get from the call using method slice*/}
                    {fav.map((favourite) => {
                        return (
                            <article className="bestseller-article" key={favourite.primary_isbn10}>
                                <img src={favourite.book_image} alt={favourite.title}/>
                                <a href={favourite.amazon_product_url}>
                                    <h3>Title: {favourite.title}</h3>
                                </a>
                                <p>Author: {favourite.author}</p>
                                {/*<p>Description: {cutOffText(favourite.description)}</p>*/}
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
