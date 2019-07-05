import React, { useReducer, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../Constants/roles';


const AdminPage = () => {
    const [data, dispatch] = useReducer(reducer, initialData);
    const firebase = useContext(FirebaseContext);

    useEffect(()=>{
        dispatch({
            loading: true
        });

        const unlisten = firebase
            .users()
            .onSnapshot(snapshot => {
                let users = [];
                snapshot.forEach(doc => 
                    users.push({ ...doc.data(), uid: doc.id })
                );
                
                dispatch({
                    users,
                    loading: false
                });
            });
        
        return () => {
            unlisten();
        }
    // one timer render, no props needed
    // eslint-disable-next-line
    }, []);
    return(
        <div>
            <h1>Admin</h1>

            {data.loading && <div>Loading ...</div>}
            <UserList users={data.users} />
        </div>
    );
};
const initialData = {
    loading: false,
    users: []
};
function reducer(state, newState){
    return { ...state, ...newState };
}


const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

const condition = authUser => {
    return authUser && !!authUser.roles[ROLES.ADMIN];
}

export default withAuthorization(condition)(AdminPage);