import React, {createContext, useEffect, useState} from "react";

// Creating Context to access the favourites throughout the whole app
export const FavContext = createContext({});

function FavContextProvider({children}) {

    const [fav, setFav] = useState(JSON.parse(localStorage.getItem("favourite books")) || []);

    // Creating a function for adding the favourites and making sure it's not added twice by comparing unique key (=primary_isbn10)
    function addFav(book) {
        console.log(fav)
        if (!fav.some(test => test["primary_isbn10"]=== book.primary_isbn10)) {
            setFav([...fav, book]);
        } else {
            console.log("Already saved");
        }
    }

    useEffect(() => {
        localStorage.setItem("favourite books", JSON.stringify(fav));
        console.log("Saving to Local Storage:", fav);
    }, [fav])

// I want to get the saved favourites out of the Local Storage
//     useEffect(() => {
//         const favFromLocalStorage = localStorage.getItem("favourite books");
//         console.log("Retrieved from Local Storage:", favFromLocalStorage);
//         if (favFromLocalStorage) {
//             setFav(JSON.parse(favFromLocalStorage));
//         }
//     }, [JSON.stringify(fav)])


    // Creating a function for removing the favourites from the array by returning all the books with the filter option except for the given one
    function removeFav(book) {
        setFav([...fav.filter((favs) => favs !== book)]);
    }

    console.log(fav)

    const data = {
        fav,
        setFav,
        addFav,
        removeFav
    }

    return (
        <FavContext.Provider value={data}>
            {children}
        </FavContext.Provider>
    );
}

export default FavContextProvider;
