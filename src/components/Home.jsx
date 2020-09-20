import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Telstra Meetings App</h1>
            <hr className="my-2" />
            <p className="lead">
                Welcome to meetings app.
            </p>
        </div>
    );
}

export default Home;