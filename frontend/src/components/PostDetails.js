const PostDetails = ({post}) => {
    return (
        <div className="post-details">
            <h4>{post.content}</h4>
            <p>{post.createdAt}</p>
        </div>
    )
}

export default PostDetails