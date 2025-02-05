import { useState } from "react"
import { usePostContext } from "../hooks/usePostContext"

const PostForm = () => {
    const {dispatch} = usePostContext()

    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const postSent = {content}

        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(postSent),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setContent('')
            setError(null)
            setEmptyFields([])
            console.log('new post added')
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
                className={emptyFields.includes('content') ? 'error':                                  ''}
            />
            <button>Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PostForm