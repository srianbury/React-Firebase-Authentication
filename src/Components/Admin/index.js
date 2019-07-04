import React, { useReducer, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';


const AdminPage = () => {
    const [data, dispatch] = useReducer(reducer, initialData);
    const firebase = useContext(FirebaseContext);

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

export default AdminPage;