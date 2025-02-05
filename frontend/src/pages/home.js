import { useEffect } from 'react'
import { usePostContext } from '../hooks/usePostContext'

//components
import PostDetails from '../components/postDetails'
import PostForm from '../components/postForm'

const Home = () => {
    const {posts, dispatch} = usePostContext()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/post')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})
            }
        }

        fetchPosts()
    }, [dispatch])

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