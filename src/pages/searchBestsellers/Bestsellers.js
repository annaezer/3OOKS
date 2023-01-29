import React from 'react';
import './Bestsellers.css';
import {Link} from "react-router-dom";

function Bestsellers() {
    return (
        <>
            <h1>Bestsellers</h1>
            <p>Not happy with the results? <Link to='/'>Search again</Link> in a different way</p>
        </>
    );
}

export default Bestsellers;
