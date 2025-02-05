import { createContext, useReducer } from "react"

//export to be used at other files
export const PostContext = createContext()

export const postReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
            posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

//provide context to components tree through context provider
//children property represents the app component in index.js
export const PostContextProvider = ({children}) => {

    //useReducer similar to useState, to update state value
    //what differs i useReducer how to update state using dispatch function
    const [state, dispatch] = useReducer(postReducer, {
        posts: null
    })

    //wraps whatever parts application needs access to
    //every components has access to context
    return (
        <PostContext.Provider value={{...state, dispatch}}>
            {children}
        </PostContext.Provider>
    )
}