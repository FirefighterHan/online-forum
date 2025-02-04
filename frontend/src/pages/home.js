import { useEffect, useState } from "react"

const Home = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:4000/api/post')
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
                {posts && posts.map((post) => ( //check if there posts have values, if yes, then map each post
                    <p key= {post._id}>{post.content}</p>
                ))}
            </div>
        </div>
    )
}

export default Home