import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';


const UserPage = ({ match }) => {
    const [user, setUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(()=>{
        if(user){ return; }
        const unsubscribe = firebase
            .user(match.params.id)
            .onSnapshot(snapshot => {
                setUser(snapshot.data());
            });
        
        return () => {
            unsubscribe && unsubscribe();
        }
    // compDidMount
    // eslint-disable-next-line
    }, []);

    return(
        <div>
            <h2>User Profile</h2>
            {!user && <div>Loading...</div>}
            {user &&
                <div>
                    <span>
                        <strong>Username:</strong> {user.username}
                    </span>
                </div>
            }
        </div>
    );
}

export default withRouter(UserPage);