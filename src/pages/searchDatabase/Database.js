import React from 'react';
import './Database.css';
import {Link} from "react-router-dom";

function Database() {

    return (
        <>
            <h1>Database</h1>
            <p>Not happy with the results? <Link to='/'>Search again</Link> in a different way</p>
        </>
    );
}

export default Database;
