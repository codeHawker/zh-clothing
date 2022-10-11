import { createContext, useState, useEffect } from 'react'
import { onAuthStateChangedListner, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';


export const UserContext = createContext({
    currentUser: null,
    setCurtrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurtrentUser] = useState(null)
    const value = {currentUser, setCurtrentUser}

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurtrentUser(user);
        })

        return unsubscribe;
    }, [] );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};