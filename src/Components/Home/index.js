import React from 'react';
import  { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';


const HomeBase = () => (
    <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by signed in users.</p>
    </div>
);


const Home = compose(
    withRouter,
    withFirebase,
    withAuthorization,
)(HomeBase);

export default Home;