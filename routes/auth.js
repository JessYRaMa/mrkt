const express = require('express');
const {signup, signin, signout, socialLogin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {userSignupValidator} = require('../validator')

const router = express.Router();

router.post("/api/signup", userSignupValidator, signup);
router.post("/api/signin", signin);
router.get("/signout", signout);
router.post("/social-login", socialLogin); 

//any route containining :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;