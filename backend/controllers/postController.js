const Post = require('../models/postModel')
const mongoose = require('mongoose')

//get all posts
const getPosts = async (req, res) => {

    const user_id = req.user._id
    const posts = await Post.find({user_id}).sort({createdAt: -1})
    res.status(200).json(posts)
}

//get a post
const getPost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"})
    }

    const post = await Post.findById(id)

    if(!post) {
        return res.status(400).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

//create a post
const createPost = async (req, res) => {
    //pass variable from schema in model to be used as object
    const {content} = req.body

    let emptyFields = []

    //push variable into emptyFields array
    if (!content) {
        emptyFields.push('content')
    }
    //to check if there is any variable in the emptyFields array, if yes, display error
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    //add document to db
    try {
        const user_id = req.user._id
        const post = await Post.create({content, user_id})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete a post
const deletePost = async (req, res) => {
    //pass id to identify which post
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if (!post) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(post)
}

//update a post
const updatePost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!post) {
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}