import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import Firebase, { FirebaseContext } from './Components/Firebase';
import * as serviceWorker from './serviceWorker';

/*
    Setting up firebase this way ensures that firebase is only instantiated once and
    it is injected via Reacts Context API.
    Now, every component that is interested in using Firebase has access to it with 
    a FirebaseContext.Consumer component.
*/
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
