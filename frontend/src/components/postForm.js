import { useState } from "react"
import { usePostContext } from "../hooks/usePostContext"
import { useAuthContext } from "../hooks/useAuthContext"

const PostForm = () => {
    const {dispatch} = usePostContext()

    const {user} = useAuthContext()

    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in to post')
            return
        }

        const postSent = {content}

        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(postSent),
            headers: {
                'Content-Type': 'application/json',
                //authorization token in headers to be used in middleware
                'Authorization': `Bearer ${user.token}`
            }
        })
        //store data into json object
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //empty the content textbox for the next action
            setContent('')
            //remove error after a correct action
            setError(null)
            //setEmptyFields back to none to check the next action
            setEmptyFields([])
            console.log('new post added')
            //dispatch function to usePostContext with the data stored as json object
            dispatch({type: 'CREATE_POST', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Post</h3>

            <label>Content:</label>
            <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className={emptyFields.includes('content') ? 'error': ''}
            />
            <button>Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PostForm