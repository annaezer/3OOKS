import React from 'react';
import './Questions.css';
import {Link} from "react-router-dom";

function Questions() {
    return (
        <>
            <h1>Questions</h1>
            <p>Not happy with the results? <Link to='/'>Search again</Link> in a different way</p>
        </>
    );
}

export default Questions;
