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

const condition = authUser => !!authUser;
const Home = compose(
    withRouter,
    withAuthorization(condition)
)(HomeBase);

export default Home;