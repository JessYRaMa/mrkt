const express = require("express");
const router = express.Router();

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");

router.get("/braintree/getToken/:userId", requireSignin, generateToken);
router.post(
    "/braintree/payment/:userId",
    requireSignin,
    processPayment
);

router.param("userId", userById);

module.exports = router;
