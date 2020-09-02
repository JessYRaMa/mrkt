const express = require('express');
const {createPost, getPosts, postByUser, postById, isPoster, deletePost, updatePosts, photo, singlePost, like, unlike, comment, uncomment, singleCategory, postByCategory} = require('../controllers/post');
const {userById} = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');
const {createPostValidator} = require('../validator')

const router = express.Router();

router.get('/posts', getPosts);

//likes
router.put('/posts/like', requireSignin, like)
router.put('/posts/unlike', requireSignin, unlike)

//comments
router.put('/posts/comment', requireSignin, comment)
router.put('/posts/uncomment', requireSignin, uncomment)


router.post("/posts/new/:userId", requireSignin, createPost, createPostValidator);
router.get('/posts/:postId', singlePost)
router.get("/posts/by/:userId", postByUser);
router.put("/posts/:postId", requireSignin, isPoster, updatePosts)
router.delete("/posts/:postId", requireSignin, isPoster, deletePost)
router.get("/posts/photo/:postId", photo);
router.get("/posts/category/:categoryName", singleCategory)

router.param("categoryName", postByCategory);

//any route containining :userId, our app will first execute userById()
router.param("userId", userById);

//any route containining :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;