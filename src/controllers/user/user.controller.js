import React, {useEffect, useState} from "react";

import {UserContext} from '../../context/user-context';
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookies = new Cookies();

export const UserController = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const [name, email] = jwt(cookies.get("token")).sub.split(',');
        setCurrentUser({name, email})
    });

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
};
