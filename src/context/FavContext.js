import React, {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

// Creating Context to access the favourites throughout the whole app
export const FavContext = createContext({});

function FavContextProvider({children}) {

    // I want to get the saved favourites as an array (therefore parse) out of the Local Storage and if none start with an empty array
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem("favourite books")) || []);

    // Creating a function for adding the favourites and making sure it's not added twice by comparing unique key (primary_isbn10 for NYT API & id for Google API) with testing function some
    function addFav(book) {
        console.log(fav)
        if (!fav.some(test => test["primary_isbn10"] === book.primary_isbn10)) {
            setFav([...fav, book]);
            toast.success("Added to Favourites", {
                icon: <span className="material-symbols-outlined">favorite</span>
            });
        } else if (!fav.some(test => test["id"] === book.id)) {
            setFav([...fav, book]);
            toast.success("Added to Favourites", {
                icon: <span className="material-symbols-outlined">favorite</span>
            });
        } else {
            toast.success("You already added this to Favourites", {
                icon: <span className="material-symbols-outlined">favorite</span>
            });
        }
    };

    useEffect(() => {
        // I want to set the favourites on change in the Local Storage but as I can't save an array I have to make it a string with stringify method
        localStorage.setItem("favourite books", JSON.stringify(fav));
        console.log("Saving to Local Storage:", fav);
    }, [fav]);

    // Creating a function for removing the favourites from the array by returning all the books with the filter option except for the given one
    function removeFav(book) {
        setFav([...fav.filter((favs) => favs !== book)]);
        toast("Removed from Favourites", {
            icon: <span className="material-symbols-outlined">delete</span>
        });
    };

    // Passing on the data I want to use elsewhere
    const data = {
        fav,
        setFav,
        addFav,
        removeFav
    };

    return (
        <FavContext.Provider value={data}>
            {children}
        </FavContext.Provider>
    );
}

export default FavContextProvider;
