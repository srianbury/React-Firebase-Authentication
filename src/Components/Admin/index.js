import React, { useReducer, useEffect } from 'react';

import { withFirebase } from '../Firebase';

const AdminPage = ({ firebase }) => {
    const [data, dispatch] = useReducer(reducer, initialData);
    useEffect(()=>{
        dispatch({
            loading: true
        });

        firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key], uid: key
            }));
            dispatch({
                loading: false,
                users: usersList
            })
        });
        
        return () => {
            firebase.users().off();
        }
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
    console.log('reducing')
    return { ...state, ...newState };
}


const UserList = ({ users, }) => (
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

export default withFirebase(AdminPage);