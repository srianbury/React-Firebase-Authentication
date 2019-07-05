import React, { useEffect, useContext, useReducer } from 'react';
import { withRouter } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';


const UserPage = ({ match }) => {
    const [user, dispatch] = useReducer(reducer, initialUser);
    const firebase = useContext(FirebaseContext);

    useEffect(()=>{
        if(user.info){ return; }
        const unsubscribe = firebase
            .user(match.params.id)
            .onSnapshot(snapshot => {
                dispatch({
                    info: snapshot.data(),
                    loading: false,
                    notfound: !snapshot.data()
                });
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
            {user.loading && <div>Loading...</div>}
            {user.notfound && <div>User ID does not exist.</div>}
            {user.info &&
                <div>
                    <span>
                        <strong>Username:</strong> {user.info.username}
                    </span>
                </div>
            }
        </div>
    );
}
const initialUser = {
    info: null,
    loading: true,
    notfound: false
}
function reducer(state, newState){
    return { ...state, ...newState };
}

export default withRouter(UserPage);