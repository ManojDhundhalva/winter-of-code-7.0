const { Router } = require("express");
const controller = require("../controllers/code");

const router = Router();

router.post("/execute-code", controller.executeCode);

module.exports = router;