const express = require('express')

const {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/postController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

// requireAuth middleware is used to verify the authentication of the user
router.use(requireAuth)

router.get('/', getPosts)

router.get('/:id', getPost)

router.post('/', createPost)

router.delete('/:id', deletePost)

router.patch('/:id', updatePost)

module.exports = router