import { useAuthContext } from "./useAuthContext"
import {useMessageContext} from "./useMessageContext"

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: messageDispatch} = useMessageContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        messageDispatch({type: 'SET_MESSAGES', payload: null})
    }

    return {logout}
}
