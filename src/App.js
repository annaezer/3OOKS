import React, {useContext} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Favourites from "./pages/favourites/Favourites";
import LogIn from "./pages/logIn/LogIn";
import SignUp from "./pages/signUp/SignUp";
import Bestsellers from "./pages/searchBestsellers/Bestsellers";
import Database from "./pages/searchDatabase/Database";
import Questions from "./pages/searchQuestions/Questions";
import NavBar from "./components/navigation/NavBar";
import Footer from "./components/footer/Footer";
import {AuthContext} from "./context/AuthContext";

function App() {

    const {auth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>

                {/*Private route made for Favourites, with the use of useContext to be able to see if someone is logged in*/}
                <Route path="/favourites" element={auth ? <Favourites/> : <Navigate to="/login"/>}/>

                <Route path="/login" element={<LogIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/bestsellers" element={<Bestsellers/>}/>
                <Route path="/database" element={<Database/>}/>
                <Route path="/questions" element={<Questions/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
