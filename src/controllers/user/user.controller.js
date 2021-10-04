import React, {useState} from "react";

import {UserContext} from '../../context/user-context';


export const UserController = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
};
