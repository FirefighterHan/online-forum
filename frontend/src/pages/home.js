import { useEffect } from 'react'
import { usePostContext } from '../hooks/usePostContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import PostDetails from '../components/postDetails'
import PostForm from '../components/postForm'

const Home = () => {
    const {posts, dispatch} = usePostContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/post', {
                //authorization token in headers to be used in middleware
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})
            }
        }
        //check if user is logged in
        if (user) {
            fetchPosts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="posts">
                {posts && posts.map((post) => ( //check if the posts have values, if yes, then map each post
                    <PostDetails key={post._id} post={post} />
                ))}
            </div>
            <PostForm />
        </div>
    )
}

export default Home