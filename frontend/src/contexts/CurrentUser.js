import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext();


export default function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch("/authentication/profile", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    // "Content-Type": "application/json"
                }
            });
                // console.log("response", response)
            // if (response.status === 200){
                const user = await response.json()
                // console.log("user", user)
                setCurrentUser(user)    
            // } else {
            //     setCurrentUser(null)
            // }
        }
        getLoggedInUser();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
};