import { PostContext } from "../contexts/postContext";
import { useContext } from "react";

export const usePostContext = () => {
    //values in postContextProvider (state and dispatch)
    const context = useContext(PostContext)

    if (!context) {
        throw Error('usePostContext must be used inside a PostContextProvider')
    }

    return context
}