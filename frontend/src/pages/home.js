import { useEffect, useState } from 'react'

//components
import PostDetails from '../components/PostDetails'

const Home = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/post')
            const json = await response.json()

            if (response.ok) {
                setPosts(json)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className="home">
            <div className="posts">
                {posts && posts.map((post) => ( //check if the posts have values, if yes, then map each post
                    <PostDetails key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Home