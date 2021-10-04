import {createContext} from 'react';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {}
});
