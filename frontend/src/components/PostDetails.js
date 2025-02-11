import { usePostContext } from "../hooks/usePostContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostDetails = ({post}) => {
    const {dispatch} = usePostContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        //check if there is user
        if (!user) {
            return
        }

        const response = await fetch('/api/post/' + post._id, {
            method: 'DELETE',
            //authorization token in headers to be used in middleware
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json})
        }
    }

    return (
        <div className="post-details">
            <h4>{post.content}</h4>
            <p>{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default PostDetails