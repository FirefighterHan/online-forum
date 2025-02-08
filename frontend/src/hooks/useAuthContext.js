import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    //values in postContextProvider (state and dispatch)
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }

    return context
}