import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import FavContextProvider from "./context/FavContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <FavContextProvider>
                    <App/>
                </FavContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>
);
