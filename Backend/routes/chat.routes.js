const express = require("express");
const router = express.Router();
const { getLegalResponse } = require("../controllers/chat.controller");

router.post("/", getLegalResponse);

module.exports = router;
