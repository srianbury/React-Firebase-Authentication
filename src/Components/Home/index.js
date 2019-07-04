import React from 'react';
import  { withRouter } from 'react-router-dom';
import { compose } from 'recompose';


import { withAuthorization } from '../Session';


const HomeBase = () => (
    <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by signed in users.</p>
    </div>
);


const Home = compose(
    withRouter,
    withAuthorization
)(HomeBase);

export default Home;