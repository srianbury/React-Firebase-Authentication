import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    /* AUTH API */
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);


    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    //we do not need to pass in anything because firebase will already know who is signed in
    doSignOut = () =>
        this.auth.signOut();

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doSignInWithGoogle = () => 
        this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    /* DB API */
    user = uid =>
        this.db.doc(`users/${uid}`);

    users = () =>
        this.db.collection('users');

    /* Merge Auth and DB User*/
    onAuthUserListener = (next, fallback) => 
        this.auth.onAuthStateChanged(async authUser => {
            if (authUser) {
                try{
                    const snapshot = await this.user(authUser.uid).get();
                    const dbUser = snapshot.data();
                    
                    // let fix this issue after we find a nice way to handle the error.
                    // i.e. display a message to the user
                    if(!dbUser){
                        console.log(authUser);
                    } 

                    if (!dbUser.roles) {
                        dbUser.roles = {};  // default empty rolesz
                    }

                    // merge uid and email from authUser with dbUser
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    };
                    next(authUser);

                } catch(error){
                    // this flow is kind of okay but it doesn't show an error message to the user
                    // would be nice to tell them it failed rather than just redirecting 
                    console.log(error);
                }
            } else {
                fallback();
            }
        });
}

export default Firebase;